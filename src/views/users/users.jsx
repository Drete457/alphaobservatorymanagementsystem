import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { countries, generic, listUsers } from 'state/atoms';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useGetUsers } from 'hooks/users';
import useGetUserActivities from 'hooks/activities/useGetUserActivities';
import homeHandler from 'helpers/users';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Button from 'components/button';
import DataTable from 'components/users';

const Users = () => {
  //delete the remain of cards positions on localStorage
  sessionStorage.removeItem('cardsPosition');
  localStorage.removeItem('cardsPosition');

  const [t] = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);
  const setListUsers = useSetRecoilState(listUsers);

  const [users, setUsers] = useState([]);
  const [genericHome, setGenericHome] = useState({});

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
  const {
    error: errorGetUserActivity,
    data: userGetActivity,
    execute: executeUserActivity,
  } = useGetUserActivities();

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

      //query how many ativities each user have
      const arrayData = Object.values(data);
      arrayData.forEach((user) => {
        if (user?.followed !== 'None') {
          executeUserActivity(user.id);
        }
      });
    }

    if (countriesList) {
      setCountries(countriesList);
    }

    if (genericList) {
      setGeneric(genericList);
      setGenericHome(genericList);
    }
  }, [
    data,
    countriesList,
    genericList,
    setCountries,
    setGeneric,
    setListUsers,
    executeUserActivity,
  ]);

  useLayoutEffect(() => {
    if (userGetActivity && users) {
      let newValue = false;

      const newUsersArray = users.map((user) => {
        if (
          user.id === userGetActivity.id &&
          user.activities !== userGetActivity.number
        ) {
          user.activities = userGetActivity.number;
          newValue = true;
        }

        return user;
      });

      if (newValue) {
        setUsers(newUsersArray);
      }
    }
  }, [userGetActivity, users]);

  useLayoutEffect(() => {
    const errorInfo =
      errorUsers || errorCountries || errorGeneric || errorGetUserActivity;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [errorUsers, errorCountries, errorGeneric, errorGetUserActivity]);

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
              {t('pages.users.numberUsers') + ': ' + users.length}
              <div className="users-button">
                <Button
                  name={t('btn.create.excel')}
                  onClick={() => homeHandler.exportToExcel(users, genericHome)}
                  className="button-font-weight"
                />
                <Button
                  name={t('btn.create.user')}
                  onClick={() => history.push(`/user/new_user`)}
                  className="button-font-weight"
                />
              </div>
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
