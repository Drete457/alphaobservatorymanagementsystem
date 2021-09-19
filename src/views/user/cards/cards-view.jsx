import { useState, useLayoutEffect } from 'react';
import { useGetUser } from 'hooks/users';
import {
  UserViewer,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-view';
import { useTranslation } from 'react-i18next';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useGetUsers } from 'hooks/users';
import { buildUsersListFilter } from 'helpers/users';
import { useSetRecoilState } from 'recoil';
import { countries, generic, listUsers } from 'state/atoms';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import View from 'components/user/buttons/view';

const CardsView = ({ match }) => {
  //delete the remain of cards positions on sessionStorage
  sessionStorage.removeItem('cardsPosition');

  const [t] = useTranslation();
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null);
  const [countriesList, setCountriesList] = useState(null);
  const [genericList, setGenericList] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);

  //Save the information on memory state
  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);
  const setListUsers = useSetRecoilState(listUsers);

  const {
    isLoading: isLoadingUserList,
    error: errorUsers,
    data: dataUserList,
    execute: executeUsersList,
  } = useGetUsers();
  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: dataCountriesList,
    execute: executeCountries,
  } = useGetCountries();
  const {
    isLoading: isLoadingGeneric,
    error: errorGeneric,
    data: dataGenericList,
    execute: executeGeneric,
  } = useGetGeneric();

  const { isLoading, error: errorServer, data, execute } = useGetUser();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
  }, [execute, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
      executeCountries();
      executeGeneric();
      executeUsersList();
    }
  }, [data, executeCountries, executeGeneric, executeUsersList]);

  useLayoutEffect(() => {
    if (dataCountriesList && dataGenericList && dataUserList) {
      const usersList = buildUsersListFilter(dataUserList);

      //for the page
      setCountriesList(dataCountriesList);
      setGenericList(dataGenericList);
      setUserList(usersList);

      //for the edit page
      setCountries(dataCountriesList);
      setGeneric(dataGenericList);
      setListUsers(usersList);
    }
  }, [
    dataCountriesList,
    dataGenericList,
    dataUserList,
    setCountries,
    setGeneric,
    setListUsers,
  ]);

  useLayoutEffect(() => {
    if (errorServer || errorGeneric || errorCountries || errorUsers) {
      setError(errorServer);
    }
  }, [errorServer, errorGeneric, errorCountries, errorUsers]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : user && userList && countriesList && genericList ? (
        <>
          <Tabs active={active} setActive={setActive} />
          <View user={user} active={active} />
          {active === 0 && (
            <UserViewer
              user={user}
              countriesList={countriesList}
              genericList={genericList}
              userList={userList}
            />
          )}
          {active === 1 && (
            <UserSocial user={user} socialList={genericList?.socialmedia} />
          )}
          {active === 2 && <UserCards user={user} userList={userList} />}
          {active === 3 && <ProfilePage user={user} />}
        </>
      ) : (
        <>
          <h1>{t('pages.user.view.notfound.title')}</h1>
        </>
      )}
      {isLoading ||
        isLoadingCountries ||
        isLoadingGeneric ||
        (isLoadingUserList && <Loading />)}
    </>
  );
};

export default CardsView;
