import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';

export const deleteUsers = async (communication, data) => {
  await communication
    .database()
    .ref('/db/utilizadores/' + data.name)
    .remove();
};

const useDeleteUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (data) => {
    try {
      setIsLoading(true);
      deleteUsers(communication, data);
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

export default useDeleteUsers;
