import { useState, useCallback } from 'react';
import { fb } from 'api';
import { countries as ref } from 'components/user';

export const postCountries = async (countries, setData) => {
  const firebase = await fb();
  await firebase
    .database()
    .ref(ref)
    .update(countries)
    .then(() => setData(true));
};

const usePostCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (countries) => {
    try {
      setIsLoading(true);
      postCountries(countries, setData);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, []),
  };
};

export default usePostCountries;
