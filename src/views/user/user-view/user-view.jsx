import { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import { useGetCountries } from '../../../hooks/countries';
import {
  UserViewer,
  UserSocial,
  UserCards,
} from '../../../components/user/view/user-view';
import ErrorInfo from '../../../components/error';
import Loading from '../../../components/loading';
import Tabs from '../../../components/user/tabs';
import View from '../../../components/user/buttons/view';

const UserView = ({ match }) => {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const { isLoading, error: userError, data, execute } = useGetUser();
  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: countries,
    execute: executeCountries,
  } = useGetCountries();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
    executeCountries();
  }, [execute, executeCountries, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
    }

    if (countries) {
      setCountriesList(countries);
    }
  }, [data, countries]);

  useLayoutEffect(() => {
    const loadingInfo = isLoading || isLoadingCountries;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoading, isLoadingCountries]);

  useLayoutEffect(() => {
    const errorInfo = userError || errorCountries;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [userError, errorCountries]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <Tabs active={active} setActive={setActive} />
          {active === 0 && (
            <UserViewer user={user} countriesList={countriesList} />
          )}
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
