import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/activities';

export const getActivity = async (id, setData) => {
  const firebase = await fb();
  const firestore = firebase.firestore();
  const callDoc = firestore.collection(ref).doc(id);

  await callDoc.get().then((doc) => {
    if (doc.exists) {
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
