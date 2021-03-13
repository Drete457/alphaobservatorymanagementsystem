import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import { social } from '../../components/user';

export const postSocial = async (communication, countries, setData) => {
  await communication
    .database()
    .ref(social)
    .update(countries)
    .then(() => setData(true));
};

const usePostSocial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (countries) => {
    try {
      setIsLoading(true);
      postSocial(communication, countries, setData);
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

export default usePostSocial;
