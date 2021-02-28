import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import ref from '../../containers/user';

export const getUser = async (communication, id, set) => {
  const response = await communication
    .database()
    .ref(ref + id)
    .get('value');

  set(response.val());
};

const useGetUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (id) => {
    try {
      setIsLoading(true);
      getUser(communication, id, setData);
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

export default useGetUser;
