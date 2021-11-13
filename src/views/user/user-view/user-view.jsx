import { useState, useLayoutEffect } from 'react';
import { useGetUser } from 'hooks/users';
import {
  UserViewer,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-view';
import { useRecoilValue } from 'recoil';
import { countries, generic, users } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import View from 'components/user/buttons/view';
import homeHandler from 'helpers/users';

const UserView = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
  const [hour, setHour] = useState('');
  const [timeZone, setTimeZone] = useState('');

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const { usersWithFollowers: usersList } = useRecoilValue(users);
  const { isLoading, error: errorServer, data, execute } = useGetUser();

  const resetPage = () => {
    setUser(null);
    setActive(0);
  };

  useLayoutEffect(() => {
    const userID = match.params.id;

    resetPage();
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

  useLayoutEffect(() => {
    if (user?.country) {
      const zone = countriesList.find(
        (country) => country.id === user.country,
      )?.timezone;

      homeHandler.minuteUpdate(setHour);
      setTimeZone(zone);
    }
  }, [user?.country, countriesList]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : user ? (
        <>
          <Tabs active={active} setActive={setActive} />
          <View user={user} active={active} hour={hour} timeZone={timeZone} />
          {active === 0 && (
            <UserViewer
              user={user}
              countriesList={countriesList}
              genericList={genericList}
              userList={usersList}
            />
          )}
          {active === 1 && (
            <UserSocial user={user} socialList={genericList?.socialmedia} />
          )}
          {active === 2 && (
            <UserCards
              user={user}
              userList={usersList}
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
    </>
  );
};

export default UserView;
