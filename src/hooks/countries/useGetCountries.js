import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';

export const getCountries = async (communication, set) => {
  const response = await communication
    .database()
    .ref('/countries')
    .get('value');

  set(response.val());
};

const useGetCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async () => {
    try {
      setIsLoading(true);
      getCountries(communication, setData);
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

export default useGetCountries;
