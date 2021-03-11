import React, { useState, useLayoutEffect } from 'react';
import { useGetCountries } from '../../../hooks/countries';
import { useGetSocial } from '../../../hooks/social';
import UserRegister from '../../../containers/user/view/user-register';
import userHandler from '../../../helpers/user';
import uniqueId from '../../../helpers/id-generator';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';
import Tabs from '../../../containers/user/tabs';

const UserRegistration = () => {
  const [user, setUser] = useState({ ...userHandler.userFormat });
  const [countriesList, setCountriesList] = useState([]);
  //  const [social, setSocial] = useState([]);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

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
    const user = { ...userHandler.userFormat };
    user.id = uniqueId();

    setUser(user);
  }, []);

  useLayoutEffect(() => {
    executeCountries();
    executeSocial();
  }, [executeCountries, executeSocial]);

  useLayoutEffect(() => {
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
  }, [countries, socialList]);

  useLayoutEffect(() => {
    const errorInfo = errorCountries || errorSocial;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [errorCountries, errorSocial]);

  useLayoutEffect(() => {
    const loadingInfo = isLoadingCountries || isLoadingSocial;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoadingCountries, isLoadingSocial]);

  const ComponenteUser = () => {
    return (
      <UserRegister
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

export default UserRegistration;
