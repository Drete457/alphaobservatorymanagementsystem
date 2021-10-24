import { useState, useCallback } from 'react';
import { fb } from 'api';
import { reception } from 'components/user';

export const deleteReceptionCard = async (receptionCard, setData) => {
  const firebase = await fb();
  await firebase
    .database()
    .ref(reception + receptionCard.name)
    .remove()
    .then(() => setData(true));
};

const useDeleteReceptionCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (receptionCard) => {
    try {
      setIsLoading(true);
      deleteReceptionCard(receptionCard, setData);
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

export default useDeleteReceptionCard;
