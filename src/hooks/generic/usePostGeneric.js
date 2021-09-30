import { useState, useCallback } from 'react';
import { getDatabase, ref, child, set } from 'firebase/database';
import { generic as reference } from 'components/user';

export const postSocial = async (generic, setData) => {
  const database = getDatabase();
  const dbRef = ref(database);
  await set(child(dbRef, reference), generic).then(() => setData(true));
};

const usePostSocial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (generic) => {
    try {
      setIsLoading(true);
      postSocial(generic, setData);
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

export default usePostSocial;
