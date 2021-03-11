import React, { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import UserViewer from '../../../containers/user/view/user-view';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';
import Tabs from '../../../containers/user/tabs';

const UserView = ({ match }) => {
  const [user, setUser] = useState({});

  const { isLoading, error, data, execute } = useGetUser();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
  }, [execute, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const ComponenteUser = () => {
    return <UserViewer user={user} />;
  };

  const ComponenteSocial = () => {
    return <></>;
  };

  const ComponenteCards = () => {
    return <></>;
  };

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <Tabs
          ComponenteUser={ComponenteUser}
          ComponenteSocial={ComponenteSocial}
          ComponenteCards={ComponenteCards}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default UserView;
