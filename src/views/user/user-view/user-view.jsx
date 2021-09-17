import { useState, useLayoutEffect } from 'react';
import { useGetUser } from 'hooks/users';
import {
  UserViewer,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-view';
import { useRecoilValue } from 'recoil';
import { countries, generic, listUsers } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import View from 'components/user/buttons/view';

const UserView = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const userList = useRecoilValue(listUsers);

  const { isLoading, error: errorServer, data, execute } = useGetUser();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
  }, [execute, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useLayoutEffect(() => {
    if (errorServer) {
      setError(errorServer);
    }
  }, [errorServer]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : user ? (
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
      {isLoading && <Loading />}
    </>
  );
};

export default UserView;
