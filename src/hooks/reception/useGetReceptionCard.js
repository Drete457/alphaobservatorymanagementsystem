import { useState, useCallback } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { reception } from 'components/user';

export const getReceptionCard = async (id, set) => {
  const database = getDatabase();
  const dbRef = ref(database);
  const response = await get(child(dbRef, reception + id));

  set(response.val());
};

const useGetReceptionCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (id) => {
    try {
      setIsLoading(true);
      getReceptionCard(id, setData);
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

export default useGetReceptionCard;
