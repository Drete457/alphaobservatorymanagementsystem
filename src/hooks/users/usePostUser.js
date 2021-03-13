import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import ref from '../../components/user';

export const postUsers = async (communication, user, setData) => {
  await communication
    .database()
    .ref(ref + user.id)
    .update(user)
    .then(() => setData(true));
};

const usePostUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (user) => {
    try {
      setIsLoading(true);
      postUsers(communication, user, setData);
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

export default usePostUsers;
