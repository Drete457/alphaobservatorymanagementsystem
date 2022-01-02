import { useState, useLayoutEffect } from 'react';
import { useGetUser, useDeleteUser } from 'hooks/users';
import {
  UserViewer,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-view';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { countries, generic, users, user as loginUser } from 'state/atoms';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import View from 'components/user/buttons/view';
import homeHandler from 'helpers/users';
import userHandler from 'helpers/user';

const CardsView = ({ match }) => {
  const [t] = useTranslation();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
  const [hour, setHour] = useState('');
  const [timeZone, setTimeZone] = useState('');
  let hashCompare = '';

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const { usersWithFollowers: dataUserList, collaborators } =
    useRecoilValue(users);
  const isUser = useRecoilValue(loginUser);

  if (collaborators) {
    hashCompare = Array.from(collaborators).find(
      (item) => item.hashcode,
    ).hashcode;
  }

  const { isLoading, error: errorServer, data, execute } = useGetUser();
  const { data: dataDeleteUser, execute: deleteUserExecute } = useDeleteUser();

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

  useLayoutEffect(() => {
    if (user?.country) {
      const zone = countriesList.find(
        (country) => country.id === user.country,
      )?.timezone;

      homeHandler.minuteUpdate(setHour);
      setTimeZone(zone);
    }
  }, [user?.country, countriesList]);

  useLayoutEffect(() => {
    if (dataDeleteUser) {
      history.push(`/`);
    }
  }, [dataDeleteUser, history]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : user && dataUserList && countriesList && genericList ? (
        <>
          {homeHandler.hashCode(isUser?.email).toString() === hashCompare && (
            <button
              onClick={() => deleteUserExecute(user.id)}
              className="eject"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Eject
            </button>
          )}
          <Tabs active={active} setActive={setActive} />
          <View user={user} active={active} hour={hour} timeZone={timeZone} />
          {active === 0 && (
            <UserViewer
              user={user}
              countriesList={countriesList}
              genericList={genericList}
              userList={dataUserList}
            />
          )}
          {active === 1 && (
            <UserSocial user={user} socialList={genericList?.socialmedia} />
          )}
          {active === 2 && (
            <UserCards
              user={user}
              userList={dataUserList}
              cardsTypes={userHandler.cardType(genericList?.cardTypes)}
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

export default CardsView;
