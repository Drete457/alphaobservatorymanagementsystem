import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import { countries as ref } from '../../components/user';

export const postCountries = async (communication, countries, setData) => {
  await communication
    .database()
    .ref('/countries')
    .update(ref)
    .then(() => setData(true));
};

const usePostCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (countries) => {
    try {
      setIsLoading(true);
      postCountries(communication, countries, setData);
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
    execute: useCallback(execute, [communication]),
  };
};

export default usePostCountries;
