import React, { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import { useGetCountries } from '../../../hooks/countries';
import { useGetSocial } from '../../../hooks/social';
import { UserEdit, UserSocial } from '../../../containers/user/view/user-edit';
import userHandler from '../../../helpers/user';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';
import Tabs from '../../../containers/user/tabs';

const UserEdition = ({ match }) => {
  const [user, setUser] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const [social, setSocial] = useState([]);
  const [active, setActive] = useState(0);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { isLoading, error: errorServer, data, execute } = useGetUser();
  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: countries,
    execute: executeCountries,
  } = useGetCountries();
  const {
    isLoading: isLoadingSocial,
    error: errorSocial,
    data: socialList,
    execute: executeSocial,
  } = useGetSocial();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
    executeCountries();
    executeSocial();
  }, [execute, executeCountries, executeSocial, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
    }

    if (countries) {
      const filterCountriesList = Array.from(countries).map(
        (value) => value.country,
      );
      setCountriesList(filterCountriesList);
    }

    if (socialList) {
      const filterSocialList = Object.values(socialList);
      setSocial(filterSocialList);
    }
  }, [data, countries, socialList]);

  useLayoutEffect(() => {
    const errorInfo = errorServer || errorCountries || errorSocial;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [errorServer, errorCountries, errorSocial]);

  useLayoutEffect(() => {
    const loadingInfo = isLoading || isLoadingCountries || isLoadingSocial;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoading, isLoadingCountries, isLoadingSocial]);

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
              setErrorMsg={setErrorMsg}
              setError={setError}
            />
          )}
          {active === 1 && (
            <UserSocial
              social={social}
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              setError={setError}
            />
          )}
          {active === 2 && ''}
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default UserEdition;
