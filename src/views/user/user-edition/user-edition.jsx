import { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import {
  UserEdit,
  UserSocial,
  UserCards,
} from '../../../components/user/view/user-edit';
import { useRecoilValue } from 'recoil';
import { countries, generic } from '../../../state/atoms';
import userHandler from '../../../helpers/user';
import ErrorInfo from '../../../components/error';
import Loading from '../../../components/loading';
import Tabs from '../../../components/user/tabs';
import Submit from '../../../components/user/buttons/submit';

const UserEdition = ({ match }) => {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(0);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

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
          <Tabs active={active} setActive={setActive} />
          {active === 0 && (
            <UserEdit
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              countriesList={countriesList}
              genericList={genericList}
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
            />
          )}
          <Submit user={user} setErrorMsg={setErrorMsg} setError={setError} />
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default UserEdition;
