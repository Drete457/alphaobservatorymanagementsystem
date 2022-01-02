import { useState, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import {
  UserRegister,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-register';
import { useRecoilValue } from 'recoil';
import { countries, generic, users } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import ErrorInfo from 'components/error';
import Submit from 'components/user/buttons/submit';
import Tabs from 'components/user/tabs';
import userHandler from 'helpers/user';
import uniqueId from 'helpers/id-generator';
import homeHandler from 'helpers/users';

const UserRegistration = () => {
  const [t] = useTranslation();
  const [user, setUser] = useState({
    ...userHandler.userFormat,
    id: uniqueId(),
  });
  const [active, setActive] = useState(0);
  const [wasModified, setWasModified] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [validName, setValidName] = useState(false);
  const [hour, setHour] = useState('');
  const [timeZone, setTimeZone] = useState('');

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const { usersWithFollowers: usersList } = useRecoilValue(users);

  useLayoutEffect(() => {
    if (user.name) {
      const result = userHandler.validName(user?.name, usersList);

      setErrorMsg(!result === false ? { name: true } : { name: false });

      setValidName(!result);
    }
  }, [user.name, usersList]);

  useLayoutEffect(() => {
    if (user.country) {
      const zone = countriesList.find(
        (country) => country.id === user.country,
      )?.timezone;

      homeHandler.minuteUpdate(setHour);
      setTimeZone(zone);
    }
  }, [user.country, countriesList]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
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
            validName={validName}
            hour={hour}
            timeZone={timeZone}
          />
          {active === 0 && (
            <UserRegister
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              countriesList={countriesList}
              genericList={genericList}
              userList={usersList}
              setWasModified={setWasModified}
              validName={validName}
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
              setWasModified={setWasModified}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserRegistration;
