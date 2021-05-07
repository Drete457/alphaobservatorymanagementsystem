import { useState, useCallback } from 'react';
import { fb } from 'api';
import { generic as ref } from 'components/user';

export const postSocial = async (generic, setData) => {
  const firebase = await fb();
  await firebase
    .database()
    .ref(ref)
    .update(generic)
    .then(() => setData(true));
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
