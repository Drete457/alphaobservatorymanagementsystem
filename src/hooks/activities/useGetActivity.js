import { useState, useCallback } from 'react';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { ref as reference } from 'components/activities';

export const getActivity = async (id, setData) => {
  const database = getFirestore();
  const callCollection = collection(database, reference);
  const callDoc = doc(callCollection, id);

  await getDoc(callDoc).then((doc) => {
    if (doc.exists()) {
      const activity = doc.data();

      setData(activity);
    }
  });
};

const useGetActivity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (id) => {
    try {
      setIsLoading(true);
      getActivity(id, setData);
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

export default useGetActivity;
