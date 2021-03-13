import React, { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import {
  UserViewer,
  UserSocial,
  UserCards,
} from '../../../containers/user/view/user-view';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';
import Tabs from '../../../containers/user/tabs';
import View from '../../../containers/user/buttons/view';

const UserView = ({ match }) => {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(null);
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

  useLayoutEffect(() => {
    const loadingInfo = isLoading;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoading]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <Tabs active={active} setActive={setActive} />
          {active === 0 && <UserViewer user={user} />}
          {active === 1 && <UserSocial user={user} />}
          {active === 2 && <UserCards />}
          <View user={user} />
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default UserView;
