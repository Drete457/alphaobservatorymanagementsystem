import { useState, useCallback } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { ref as reference } from 'components/activities';

export const getActivitiesByDate = async (startDate, endDate, setData) => {
  const database = getFirestore();
  const callCollection = collection(database, reference);
  const queryFormat = query(
    callCollection,
    where('date', '>=', startDate),
    where('date', '<=', endDate),
  );
  const snapshot = await getDocs(queryFormat);
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

const useGetActivitiesByDate = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (startDate, endDate) => {
    try {
      setIsLoading(true);
      getActivitiesByDate(startDate, endDate, setData);
    } catch (e) {
      setError(e);
    } finally {
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

export default useGetActivitiesByDate;
