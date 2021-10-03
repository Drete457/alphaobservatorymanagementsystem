import { useState, useCallback } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { ref as reference } from 'components/user';

export const getUsers = async (set) => {
  const database = getDatabase();
  const dbRef = ref(database);
  const response = await get(child(dbRef, reference));

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
