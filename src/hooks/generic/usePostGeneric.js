import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from 'state/atoms';
import { generic as ref } from 'components/user';

export const postSocial = async (communication, Generic, setData) => {
  await communication
    .database()
    .ref(ref)
    .update(Generic)
    .then(() => setData(true));
};

const usePostSocial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (Generic) => {
    try {
      setIsLoading(true);
      postSocial(communication, Generic, setData);
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
    execute: useCallback(execute, [communication]),
  };
};

export default usePostSocial;
