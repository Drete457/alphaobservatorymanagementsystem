import { useState, useCallback } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { ref as reference } from 'components/user';

export const getUser = async (id, set) => {
  const database = getDatabase();
  const dbRef = ref(database);
  const response = await get(child(dbRef, reference + id));

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
