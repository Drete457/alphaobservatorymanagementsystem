import { useState, useCallback } from 'react';
import { getDatabase, ref, child, remove } from 'firebase/database';
import { ref as reference } from 'components/user';

export const deleteUser = async (id, setData) => {
  const database = getDatabase();
  const dbRef = ref(database);

  await remove(child(dbRef, reference + id)).then(() => setData(true));
};

const useDeleteUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (id) => {
    try {
      setIsLoading(true);
      deleteUser(id, setData);
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

export default useDeleteUsers;
