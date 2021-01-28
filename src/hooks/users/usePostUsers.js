import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';

export const postUser = async (communication, set, data) => {
  const response = await communication
    .database()
    .ref('usersTest/' + data.username)
    .set(data);

  set(response);
};

const usePostUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const communication = useRecoilValue(api);

  const execute = async (data) => {
    try {
      setIsLoading(true);
      postUser(communication, setData, data);
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

export default usePostUser;
