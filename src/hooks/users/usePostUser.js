import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';

export const postUsers = async (communication, data) => {
  await communication
    .database()
    .ref('/db/utilizadores/' + data.name)
    .update(data);
};

const usePostUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (data) => {
    try {
      setIsLoading(true);
      postUsers(communication, data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    execute: useCallback(execute, [communication]),
  };
};

export default usePostUsers;
