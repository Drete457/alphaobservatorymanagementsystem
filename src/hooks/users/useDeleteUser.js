import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';

export const deleteUsers = async (communication, user, setData) => {
  await communication
    .database()
    .ref('/db/users/' + user.name)
    .remove()
    .then(() => setData(true));
};

const useDeleteUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (user) => {
    try {
      setIsLoading(true);
      deleteUsers(communication, user, setData);
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

export default useDeleteUsers;
