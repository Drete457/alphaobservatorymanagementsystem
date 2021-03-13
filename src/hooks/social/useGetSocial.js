import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import { social as ref } from '../../components/user';

export const getSocial = async (communication, set) => {
  const response = await communication.database().ref(ref).get('value');

  set(response.val());
};

const useGetSocial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async () => {
    try {
      setIsLoading(true);
      getSocial(communication, setData);
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

export default useGetSocial;
