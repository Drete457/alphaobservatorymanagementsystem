import { useState, useCallback } from 'react';
import { ref } from 'components/user';
import { fb } from 'api';

export const getUsers = async (set) => {
  const firebase = await fb();
  const response = await firebase.database().ref(ref).get('value');

  set(response.val());
};

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async () => {
    try {
      setIsLoading(true);
      getUsers(setData);
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

export default useGetUsers;
