import { useState, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useGetUser } from 'hooks/users';
import {
  UserEdit,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-edit';
import { useRecoilValue } from 'recoil';
import { countries, generic, users } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import userHandler from 'helpers/user';
import homeHandler from 'helpers/users';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import Submit from 'components/user/buttons/submit';

const UserEdition = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(parseInt(match.params.page));
  const [wasModified, setWasModified] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [hour, setHour] = useState('');
  const [timeZone, setTimeZone] = useState('');

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const { usersWithFollowers: usersList } = useRecoilValue(users);

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
          <Prompt
            when={wasModified}
            message={() => t('pages.user.leaving-the-page')}
          />
          <Tabs active={active} setActive={setActive} />
          <Submit
            user={user}
            setErrorMsg={setErrorMsg}
            setError={setError}
            setWasModified={setWasModified}
            hour={hour}
            timeZone={timeZone}
          />
          {active === 0 && (
            <UserEdit
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              countriesList={countriesList}
              genericList={genericList}
              userList={usersList}
              setWasModified={setWasModified}
            />
          )}
          {active === 1 && (
            <UserSocial
              socialList={genericList?.socialmedia}
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              setWasModified={setWasModified}
            />
          )}
          {active === 2 && (
            <UserCards
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              cardsTypes={userHandler.cardType(genericList?.cardTypes)}
              userList={usersList}
            />
          )}
          {active === 3 && (
            <ProfilePage
              user={user}
              setUser={setUser}
              setError={setError}
              setWasModified={setWasModified}
            />
          )}
        </>
      ) : (
        <>
          <h1>{t('pages.user.edit.notfound.title')}</h1>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default UserEdition;
