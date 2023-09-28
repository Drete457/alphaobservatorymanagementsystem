import { useState, useCallback } from 'react';
import { getDatabase, ref, child, set } from 'firebase/database';
import { ref as reference } from 'components/user';

export const postUsers = async (user, setData, setError, setIsLoading) => {
  const database = getDatabase();
  const dbRef = ref(database);
  await set(child(dbRef, reference + user.id), user)
    .then(() => setData(true))
    .catch((error) => setError(error))
    .finally(() => setIsLoading(false));
};

const usePostUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  const execute = (user) => {
    setIsLoading(true);
    setData(false);
    postUsers(user, setData, setError, setIsLoading);
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, []),
  };
};

export default usePostUsers;
