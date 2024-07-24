import { useState, useCallback } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { reception } from 'components/user';

export const getReceptionCards = async (set) => {
  const database = getDatabase();
  const dbRef = ref(database, reception);

  onValue(dbRef, (snapshot) => {
    if (snapshot.val() !== null) {
      set(snapshot.val());
    }
  });
};

const useGetReceptionCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const execute = async () => {
    try {
      setIsLoading(true);
      await getReceptionCards(setData);
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
