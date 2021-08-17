import { useState, useCallback } from 'react';
import { fb } from 'api';
import { ref } from 'components/activities';

export const getActivities = async (setData) => {
  const firebase = await fb();
  const firestore = firebase.firestore();
  const callDoc = firestore.collection(ref);

  await callDoc.get().then((snapshot) => {
    const newActivitiesArray = [];

    snapshot.forEach?.((doc) => {
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
  });
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
