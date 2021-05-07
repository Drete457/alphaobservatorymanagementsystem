import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/user';

export const getUser = async (id, set) => {
  const firebase = await fb();
  const response = await firebase
    .database()
    .ref(ref + id)
    .get('value');

  set(response.val());
};

const useGetUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (id) => {
    try {
      setIsLoading(true);
      getUser(id, setData);
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

export default useGetUser;
