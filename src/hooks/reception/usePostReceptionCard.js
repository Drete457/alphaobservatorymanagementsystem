import { useState, useCallback } from 'react';
import { getDatabase, ref, child, set } from 'firebase/database';
import { reception } from 'components/user';

export const postReceptionCard = async (receptionCard, setData) => {
  const database = getDatabase();
  const dbRef = ref(database);
  await set(child(dbRef, reception + receptionCard.id), receptionCard).then(
    () => setData(true),
  );
};

const usePostReceptionCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  const execute = async (receptionCard) => {
    try {
      setIsLoading(true);
      await postReceptionCard(receptionCard, setData);
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

export default usePostReceptionCard;
