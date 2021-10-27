import { useState, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { countries, generic, listUsers } from 'state/atoms';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import {
  ReceptionRegister,
  ReceptionSocial,
  ProfilePage,
} from 'components/reception/view/reception-register';
import { useGetReceptionCard } from 'hooks/reception';
import ErrorInfo from 'components/error';
import Tabs from 'components/reception/tabs';
import Submit from 'components/reception/buttons/submit';
import Loading from 'components/loading';
import userHandler from 'helpers/user';

const ReceptionEdit = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState({});
  const [active, setActive] = useState(0);
  const [wasModified, setWasModified] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [validName, setValidName] = useState(false);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const usersList = useRecoilValue(listUsers);

  const {
    isLoading,
    error: errorServer,
    data,
    execute,
  } = useGetReceptionCard();

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
    if (user.name) {
      const result = userHandler.validName(user?.name, usersList);

      setErrorMsg(!result === false ? { name: true } : { name: false });

      setValidName(!result);
    }
  }, [user.name, usersList]);

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
          />
          {active === 0 && (
            <ReceptionRegister
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
            <ReceptionSocial
              socialList={genericList?.socialmedia}
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              setWasModified={setWasModified}
            />
          )}
          {active === 2 && (
            <ProfilePage
              user={user}
              setUser={setUser}
              setWasModified={setWasModified}
            />
          )}
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default ReceptionEdit;