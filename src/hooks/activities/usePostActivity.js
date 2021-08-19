import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/activities';

export const postActivity = async (activity, setData) => {
  const firebase = await fb();
  const firestore = firebase.firestore();
  const callDoc = firestore.collection(ref).doc(activity.id);

  await callDoc.set(activity).then(() => setData(true));
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
