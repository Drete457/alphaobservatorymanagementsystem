import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import ref from '../../components/user';

export const getUsers = async (communication, set) => {
  const response = await communication.database().ref(ref).get('value');

  set(response.val());
};

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async () => {
    try {
      setIsLoading(true);
      getUsers(communication, setData);
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

export default useGetUsers;
