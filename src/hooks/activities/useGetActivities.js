import { useState, useCallback } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ref as reference } from 'components/activities';

export const getActivities = async (setData) => {
  const database = getFirestore();
  const callCollection = collection(database, reference);
  const snapshot = await getDocs(callCollection);
  const newActivitiesArray = [];

  snapshot?.forEach((doc) => {
    const activity = doc.data();

    newActivitiesArray.push({
      id: doc.id,
      date: activity.date,
      list: activity.list,
      listInfo: activity.listInfo,
      type: activity.type,
    });
  });

  setData(newActivitiesArray);
};

const useGetActivaties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async () => {
    try {
      setIsLoading(true);
      getActivities(setData);
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

export default useGetActivaties;
