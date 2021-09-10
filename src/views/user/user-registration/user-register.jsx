import { useState } from 'react';
import { Prompt } from 'react-router-dom';
import {
  UserRegister,
  UserSocial,
  UserCards,
  ProfilePage,
} from 'components/user/view/user-register';
import { useRecoilValue } from 'recoil';
import { countries, generic, listUsers } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import ErrorInfo from 'components/error';
import userHandler from 'helpers/user';
import uniqueId from 'helpers/id-generator';
import Tabs from 'components/user/tabs';
import Submit from 'components/user/buttons/submit';

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

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const userList = useRecoilValue(listUsers);

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
          />
          {active === 0 && (
            <UserRegister
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              countriesList={countriesList}
              genericList={genericList}
              userList={userList}
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
              cardsTypes={genericList?.cardTypes}
              userList={userList}
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
