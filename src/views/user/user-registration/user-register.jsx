import { useState, useLayoutEffect } from 'react';
import { useGetCountries } from '../../../hooks/countries';
import { useGetSocial } from '../../../hooks/social';
import {
  UserRegister,
  UserSocial,
  UserCards,
} from '../../../components/user/view/user-register';
import { cardstypes } from '../../../assets/generic/generic-information.json';
import userHandler from '../../../helpers/user';
import uniqueId from '../../../helpers/id-generator';
import ErrorInfo from '../../../components/error';
import Loading from '../../../components/loading';
import Tabs from '../../../components/user/tabs';
import Submit from '../../../components/user/buttons/submit';

const UserRegistration = () => {
  const [user, setUser] = useState({ ...userHandler.userFormat });
  const [countriesList, setCountriesList] = useState([]);
  const [socialList, setSocialList] = useState([]);
  const [active, setActive] = useState(0);
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
    data: social,
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
      const newCountriesList = countries.map((country) => {
        return { name: country.country, id: country.id };
      });
      setCountriesList(newCountriesList);
    }

    if (social) {
      const filterSocialList = Object.values(social);

      setSocialList(filterSocialList);
    }
  }, [countries, social]);

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
            />
          )}
          {active === 1 && (
            <UserSocial
              socialList={socialList}
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
              cardsTypes={cardstypes}
            />
          )}
          <Submit user={user} setErrorMsg={setErrorMsg} setError={setError} />
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default UserRegistration;
