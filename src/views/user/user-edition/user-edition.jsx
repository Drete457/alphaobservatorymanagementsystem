import React, { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import { useGetCountries } from '../../../hooks/countries';
import { useGetSocial } from '../../../hooks/social';
import UserEdit from '../../../containers/user/view/user-edit';
import userHandler from '../../../helpers/user';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';
import Tabs from '../../../containers/user/tabs';

const UserEdition = ({ match }) => {
  const [user, setUser] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  // const [social, setSocial] = useState([]);
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

  const ComponenteUser = () => {
    return (
      <UserEdit
        user={user}
        setUser={setUser}
        errorMsg={errorMsg}
        userHandler={userHandler}
        countriesList={countriesList}
        setErrorMsg={setErrorMsg}
        setError={setError}
      />
    );
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
      {loading && <Loading />}
    </>
  );
};

export default UserEdition;
