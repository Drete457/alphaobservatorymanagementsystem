import { useState, useCallback } from 'react';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { ref as reference } from 'components/activities';

export const postActivity = async (activity, setData) => {
  const database = getFirestore();
  const callCollection = collection(database, reference);
  const callDoc = doc(callCollection, activity.id);

  await setDoc(callDoc, activity).then(() => setData(true));
};

const usePostActivity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (activity) => {
    try {
      setIsLoading(true);
      postActivity(activity, setData);
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

export default usePostActivity;
