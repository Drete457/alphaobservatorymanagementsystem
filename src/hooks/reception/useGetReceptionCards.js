import { useState, useCallback } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { reception } from 'components/user';

export const getReceptionCards = async (set) => {
  const database = getDatabase();
  const dbRef = ref(database);
  const response = await get(child(dbRef, reception));
  if (response.val() === null) {
    set([]);
  } else {
    set(response.val());
  }
};

const useGetReceptionCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async () => {
    try {
      setIsLoading(true);
      getReceptionCards(setData);
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

export default useGetReceptionCards;
