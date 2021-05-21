import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useGetUsers } from 'hooks/users';
import { useSetRecoilState } from 'recoil';
import { countries, generic, listUsers } from 'state/atoms';
import homeHandler from 'helpers/users';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Button from 'components/button';
import DataTable from 'components/users';

const Users = () => {
  //delete the remain of cards positions on localStorage
  localStorage.removeItem('cardsPosition');

  const [t] = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);
  const setListUsers = useSetRecoilState(listUsers);

  const [users, setUsers] = useState([]);
  const { isLoading, error: errorUsers, data, execute } = useGetUsers();
  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: countriesList,
    execute: executeCountries,
  } = useGetCountries();
  const {
    isLoading: isLoadingGeneric,
    error: errorGeneric,
    data: genericList,
    execute: executeGeneric,
  } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
    executeCountries();
    executeGeneric();
  }, [execute, executeCountries, executeGeneric]);

  useLayoutEffect(() => {
    if (data && genericList && countriesList) {
      homeHandler.buildUserList(
        data,
        countriesList,
        genericList,
        setListUsers,
        setUsers,
      );
    }

    if (countriesList) {
      setCountries(countriesList);
    }

    if (genericList) {
      setGeneric(genericList);
    }
  }, [
    data,
    countriesList,
    genericList,
    setCountries,
    setGeneric,
    setListUsers,
  ]);

  useLayoutEffect(() => {
    const errorInfo = errorUsers || errorCountries || errorGeneric;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [errorUsers, errorCountries, errorGeneric]);

  useLayoutEffect(() => {
    const loadingInfo = isLoading || isLoadingCountries || isLoadingGeneric;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoading, isLoadingCountries, isLoadingGeneric]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.users.title')}</h1>
          </header>

          <main>
            <hr />
            <nav className="users-nav h3">
              {t('pages.users.table-title')}
              <Button
                name={t('btn.create.user')}
                onClick={() => history.push(`/user/new_user`)}
                className="users-button"
              />
            </nav>
            <hr />

            <DataTable users={users} isLoading={isLoading} />
          </main>
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default Users;
