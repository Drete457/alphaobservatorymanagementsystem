import React, { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import UserViewer from '../../../containers/user/user-view';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';

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

  return (
    <>
      {error ? <ErrorInfo error={error} /> : <UserViewer user={user} />}
      {isLoading && <Loading />}
    </>
  );
};

export default UserView;
