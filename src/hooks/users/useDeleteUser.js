import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/user';

export const deleteUsers = async (user, setData) => {
  const firebase = await fb();
  await firebase
    .database()
    .ref(ref + user.name)
    .remove()
    .then(() => setData(true));
};

const useDeleteUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (user) => {
    try {
      setIsLoading(true);
      deleteUsers(user, setData);
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

export default useDeleteUsers;
