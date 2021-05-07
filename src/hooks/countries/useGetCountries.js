import { useState, useCallback } from 'react';
import { fb } from 'api';
import { countries as ref } from 'components/user';

export const getCountries = async (set) => {
  const firebase = await fb();
  const response = await firebase.database().ref(ref).get('value');

  set(response.val());
};

const useGetCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async () => {
    try {
      setIsLoading(true);
      getCountries(setData);
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

export default useGetCountries;
