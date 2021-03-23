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
import { countries, generic, listUsers } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import userHandler from 'helpers/user';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/user/tabs';
import Submit from 'components/user/buttons/submit';

const UserEdition = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState({});
  const [active, setActive] = useState(0);
  const [wasModified, setWasModified] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
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
      ) : (
        <>
          <Prompt
            when={wasModified}
            message={() => t('pages.user.leaving-the-page')}
          />
          <Tabs active={active} setActive={setActive} />
          {active === 0 && (
            <UserEdit
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
            <ProfilePage user={user} setUser={setUser} setError={setError} />
          )}
          <Submit
            user={user}
            setErrorMsg={setErrorMsg}
            setError={setError}
            setWasModified={setWasModified}
          />
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default UserEdition;
