import { useCallback } from 'react';
import { fb } from 'api';
import { error as ref } from 'components/user';

export const postError = async (error) => {
  const errorBody = {
    code: error?.code,
    message: error?.message,
    time: new Date(),
  };
  const firebase = await fb();

  await firebase
    .database()
    .ref(ref + errorBody.time)
    .update(errorBody)
    .catch((error) => {});
};

const usePostError = () => {
  const execute = async (error) => {
    try {
      postError(error);
    } catch (e) {}
  };

  return {
    execute: useCallback(execute, []),
  };
};

export default usePostError;
