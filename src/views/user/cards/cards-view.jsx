import { useState, useLayoutEffect } from 'react';
import { useGetUser } from 'hooks/users';
import {
  UserViewer,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-view';
import { useTranslation } from 'react-i18next';
import { useGetUsers } from 'hooks/users';
import { buildUsersListFilter } from 'helpers/users';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { countries, generic, listUsers } from 'state/atoms';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import View from 'components/user/buttons/view';

const CardsView = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

  //Save the information on memory state
  const setListUsers = useSetRecoilState(listUsers);

  const {
    isLoading: isLoadingUserList,
    error: errorUsers,
    data: dataUserList,
    execute: executeUsersList,
  } = useGetUsers();
  const { isLoading, error: errorServer, data, execute } = useGetUser();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
  }, [execute, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
      executeUsersList();
    }
  }, [data, executeUsersList]);

  useLayoutEffect(() => {
    if (dataUserList) {
      const usersList = buildUsersListFilter(dataUserList);

      //for the page
      setUserList(usersList);

      //for the edit page
      setListUsers(usersList);
    }
  }, [dataUserList, setListUsers]);

  useLayoutEffect(() => {
    if (errorServer || errorUsers) {
      setError(errorServer);
    }
  }, [errorServer, errorUsers]);

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
          {active === 2 && (
            <UserCards
              user={user}
              userList={userList}
              cardsTypes={genericList?.cardTypes}
            />
          )}
          {active === 3 && <ProfilePage user={user} />}
        </>
      ) : (
        <>
          <h1>{t('pages.user.view.notfound.title')}</h1>
        </>
      )}
      {isLoading && <Loading />}
      {isLoadingUserList && <Loading />}
    </>
  );
};

export default CardsView;
