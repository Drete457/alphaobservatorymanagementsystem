import { useState } from 'react';
import {
  UserRegister,
  UserSocial,
  UserCards,
} from '../../../components/user/view/user-register';
import { useRecoilValue } from 'recoil';
import { countries, generic, listUsers } from '../../../state/atoms';
import ErrorInfo from '../../../components/error';
import userHandler from '../../../helpers/user';
import uniqueId from '../../../helpers/id-generator';
import Tabs from '../../../components/user/tabs';
import Submit from '../../../components/user/buttons/submit';

const UserRegistration = () => {
  const [user, setUser] = useState({
    ...userHandler.userFormat,
    id: uniqueId(),
  });
  const [active, setActive] = useState(0);
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
          <Tabs active={active} setActive={setActive} />
          {active === 0 && (
            <UserRegister
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              countriesList={countriesList}
              genericList={genericList}
              userList={userList}
            />
          )}
          {active === 1 && (
            <UserSocial
              socialList={genericList?.socialmedia}
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
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
          <Submit user={user} setErrorMsg={setErrorMsg} setError={setError} />
        </>
      )}
    </>
  );
};

export default UserRegistration;
