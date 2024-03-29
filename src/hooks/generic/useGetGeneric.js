import { useState, useCallback } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { generic as reference } from 'components/user';

export const getSocial = async (set) => {
  const database = getDatabase();
  const dbRef = ref(database);
  const response = await get(child(dbRef, reference));

  if (response.val() !== null) {
    set(response.val());
  }
};

const useGetGeneric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const execute = async () => {
    try {
      setIsLoading(true);
      await getSocial(setData);
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

export default useGetGeneric;
