import { useState, useLayoutEffect } from 'react';
import { useGetUser } from '../../../hooks/users';
import { useGetCountries } from '../../../hooks/countries';
import { useGetGeneric } from '../../../hooks/generic';
import {
  UserEdit,
  UserSocial,
  UserCards,
} from '../../../components/user/view/user-edit';
import userHandler from '../../../helpers/user';
import ErrorInfo from '../../../components/error';
import Loading from '../../../components/loading';
import Tabs from '../../../components/user/tabs';
import Submit from '../../../components/user/buttons/submit';

const UserEdition = ({ match }) => {
  const [user, setUser] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const [socialList, setSocialList] = useState([]);
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
    isLoading: isLoadingGeneric,
    error: errorGeneric,
    data: generic,
    execute: executeGeneric,
  } = useGetGeneric();

  useLayoutEffect(() => {
    const userID = match.params.id;
    execute(userID);
    executeCountries();
    executeGeneric();
  }, [execute, executeCountries, executeGeneric, match]);

  useLayoutEffect(() => {
    if (data) {
      setUser(data);
    }

    if (countries) {
      const newCountriesList = countries.map((country) => {
        return { name: country.country, id: country.id };
      });
      setCountriesList(newCountriesList);
    }

    if (generic) {
      const filterSocialList = Object.values(generic.social);
      setSocialList(filterSocialList);
    }
  }, [data, countries, generic]);

  useLayoutEffect(() => {
    const errorInfo = errorServer || errorCountries || errorGeneric;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [errorServer, errorCountries, errorGeneric]);

  useLayoutEffect(() => {
    const loadingInfo = isLoading || isLoadingCountries || isLoadingGeneric;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoading, isLoadingCountries, isLoadingGeneric]);

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
            />
          )}
          {active === 1 && (
            <UserSocial
              social={socialList}
              user={user}
              setUser={setUser}
              errorMsg={errorMsg}
            />
          )}
          {active === 2 && <UserCards />}
          <Submit user={user} setErrorMsg={setErrorMsg} setError={setError} />
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default UserEdition;
