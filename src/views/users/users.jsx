import { useState, useLayoutEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetCountries } from '../../hooks/countries';
import { useGetGeneric } from '../../hooks/generic';
import { countries, generic, listUsers } from '../../state/atoms';
import { useSetRecoilState } from 'recoil';
import { useGetUsers } from '../../hooks/users';
import userHandler from '../../helpers/user';
import homeHandler from '../../components/home';
import ErrorInfo from '../../components/error';
import Loading from '../../components/loading';
import Button from '../../components/button';
import CIcon from '@coreui/icons-react';

const Home = () => {
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
      const arrayData = Object.values(data);
      const userList = arrayData.map((user) => {
        return { id: user.id, name: user.name };
      });

      const fillArrayData = arrayData.map((user) => {
        if (user.followed) {
          const followedBy = userList.find(
            (value) => value.id === user.followed,
          )?.name;

          user.followed = followedBy;
        }

        if (user.contacted) {
          const contactBy = userList.find(
            (value) => value.id === user.contacted,
          )?.name;

          user.contacted = contactBy;
        }

        if (user.country) {
          const countryName = countriesList.find(
            (country) => country.id === user.country,
          );

          user.country = userHandler.countryNameAndGmt(countryName);
        }

        if (user.birthyear) {
          const year = genericList?.years.find(
            (year) => year.id === user.birthyear,
          );
          user.groupAge = homeHandler.groupAge(
            year.name,
            genericList?.groupAge,
          );
        } else {
          user.groupAge = '';
        }

        if (user.introductionOption) {
          const introductionOption = genericList?.options.find(
            (value) => value.id === user.introductionOption,
          )?.name;

          user.introductionOption = introductionOption;
        }

        //temporary solution for undefinied for each user on the table
        user.ambitEntry = '';
        user.activities = '';

        return user;
      });

      if (userList.length > 0) {
        setListUsers(userList);
      }

      setUsers(fillArrayData);
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
              itemsPerPage={100}
              isLoading={isLoading}
              noItemsViewSlot={
                <div className="text-center my-5">
                  <h2>
                    {t('pages.users.no-info')}
                    <CIcon
                      width="30"
                      name="cilBan"
                      className="text-danger mb-2"
                    />
                  </h2>
                </div>
              }
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
