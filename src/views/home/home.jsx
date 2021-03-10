import React, { useState, useEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetUsers } from '../../hooks/users';
import homeHandler from '../../containers/home';
import ErrorInfo from '../../containers/error';
import Button from '../../containers/button';

const Home = () => {
  const [t] = useTranslation();
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const { isLoading, error, data, execute } = useGetUsers();

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data) {
      const arrayData = Object.values(data);
      const groupAgeArray = homeHandler.groupAge(arrayData);

      setUsers(groupAgeArray);
    }
  }, [data]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.home.title')}</h1>
          </header>

          <main>
            <nav className="home-nav">
              <Button
                name={t('btn.create.user')}
                onClick={() => history.push(`/user/new_user`)}
                className="home-button"
              />
            </nav>

            <CDataTable
              addTableClasses="home-table"
              items={users}
              fields={homeHandler.fields(t)}
              columnFilter
              hover
              striped
              sorter
              size="sm"
              responsive
              isLoading={isLoading}
              scopedSlots={{
                view: (item) => {
                  return (
                    <td>
                      <Button
                        name={t('btn.view')}
                        onClick={() => history.push(`/user/${item.id}`)}
                        className="home-button"
                      />
                    </td>
                  );
                },
              }}
            />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
