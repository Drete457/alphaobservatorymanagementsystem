import { useState, useLayoutEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetUsers } from '../../hooks/users';
import homeHandler from '../../components/home';
import ErrorInfo from '../../components/error';
import Button from '../../components/button';

const Home = () => {
  const [t] = useTranslation();
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const { isLoading, error, data, execute } = useGetUsers();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (data) {
      const arrayData = Object.values(data);
      const fillArrayData = arrayData.map((user) => {
        user.groupAge = homeHandler.groupAge(user);

        //temporary solution for undefinied for each user on the table
        user.ambitEntry = '';
        user.activities = '';

        return user;
      });

      setUsers(fillArrayData);
    }
  }, [data]);

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
                        onClick={() => history.push(`/user/view/${item.id}`)}
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
