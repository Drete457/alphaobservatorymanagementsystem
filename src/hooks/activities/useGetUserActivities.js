import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/activities';

export const getActivities = async (id, setData) => {
  const firebase = await fb();
  const firestore = firebase.firestore();
  const callCollection = firestore.collection(ref);

  await callCollection
    .where('list', 'array-contains', id)
    .get()
    .then((result) => {
      if (!result.empty) {
        const howManyActivities = result.size;

        setData({ id: id, number: howManyActivities });
      }
    });
};

const useGetUserActivities = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (id) => {
    try {
      getActivities(id, setData);
    } catch (e) {
      setError(e);
    }
  };

  return {
    error,
    data,
    execute: useCallback(execute, []),
  };
};

export default useGetUserActivities;
