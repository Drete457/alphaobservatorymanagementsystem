import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/user';

export const postUsers = async (user, setData) => {
  const firebase = await fb();
  await firebase
    .database()
    .ref(ref + user.id)
    .update(user)
    .then(() => setData(true));
};

const usePostUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (user) => {
    try {
      setIsLoading(true);
      postUsers(user, setData);
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

export default usePostUsers;
