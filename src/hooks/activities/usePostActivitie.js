import { useState, useCallback } from 'react';
import { fb } from 'api';

export const postActivitie = async (activatie, setData) => {
  const firebase = await fb();
  const firestore = firebase.firestore();
  const callDoc = firestore.collection('activatiesList').doc();

  await callDoc.set(activatie).then(() => setData(true));
};

const usePostActivatie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (activitie) => {
    try {
      setIsLoading(true);
      postActivitie(activitie, setData);
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

export default usePostActivatie;
