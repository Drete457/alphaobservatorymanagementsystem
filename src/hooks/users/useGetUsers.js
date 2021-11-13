import { useState, useCallback } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ref as reference } from 'components/user';

export const getUsers = async (set) => {
  const database = getDatabase();
  const dbRef = ref(database, reference);

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    set(data);
  });
};

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async () => {
    try {
      setIsLoading(true);
      getUsers(setData);
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

export default useGetUsers;
