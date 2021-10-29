import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  countries,
  generic,
  listUsers,
  usersWithFollowers,
  logs,
} from 'state/atoms';

import { useGetUsers } from 'hooks/users';
import homeHandler from 'helpers/users';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Button from 'components/button';
import DataTable from 'components/users';

const Users = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const setListUsers = useSetRecoilState(listUsers);
  const setUsersWithFollowers = useSetRecoilState(usersWithFollowers);
  const setLogs = useSetRecoilState(logs);

  const { isLoading, error: errorUsers, data, execute } = useGetUsers();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (data) {
      homeHandler.buildUserList(
        data,
        countriesList,
        genericList,
        setListUsers,
        setUsers,
        setUsersWithFollowers,
        setLogs,
      );
    }
  }, [
    data,
    countriesList,
    genericList,
    setListUsers,
    setUsersWithFollowers,
    setLogs,
  ]);

  useLayoutEffect(() => {
    const errorInfo = errorUsers;
    const loadingInfo = isLoading;

    if (errorInfo) {
      setError(errorInfo);
    }

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [errorUsers, isLoading]);

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
                  onClick={() => homeHandler.exportToExcel(users, genericList)}
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
