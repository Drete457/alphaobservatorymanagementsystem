import { useState, useLayoutEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetCountries } from '../../hooks/countries';
import { useGetGeneric } from '../../hooks/generic';
import { countries, generic } from '../../state/atoms';
import { useSetRecoilState } from 'recoil';
import { useGetUsers } from '../../hooks/users';
import homeHandler from '../../components/home';
import ErrorInfo from '../../components/error';
import Loading from '../../components/loading';
import Button from '../../components/button';

const Home = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);

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

    if (countriesList) {
      setCountries(countriesList);
    }

    if (genericList) {
      setGeneric(genericList);
    }
  }, [data, countriesList, genericList, setCountries, setGeneric]);

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
      {loading && <Loading />}
    </>
  );
};

export default Home;
