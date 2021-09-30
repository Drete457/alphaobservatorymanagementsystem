import { useState, useCallback } from 'react';
import { getDatabase, ref, child, set } from 'firebase/database';
import { ref as reference } from 'components/user';

export const postUsers = async (user, setData) => {
  const database = getDatabase();
  const dbRef = ref(database);
  await set(child(dbRef, reference + user.id), user).then(() => setData(true));
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
