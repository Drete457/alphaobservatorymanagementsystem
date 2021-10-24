import { useState, useCallback } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { ref as reference } from 'components/activities';

export const getActivities = async (date, setData) => {
  const database = getFirestore();
  const callCollection = collection(database, reference);
  const queryFormat = query(callCollection, where('date', '>=', date));
  const array = [];

  await getDocs(queryFormat).then((docs) => {
    if (docs) {
      docs.forEach((doc) => {
        array.push(doc.data());
      });
    }
  });

  setData(array);
};

const useGetLastActivities = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (date) => {
    try {
      getActivities(date, setData);
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

export default useGetLastActivities;
