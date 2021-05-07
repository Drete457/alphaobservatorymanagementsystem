import { useCallback } from 'react';
import { fb } from 'api';
import id from 'helpers/id-generator';
import { error as ref } from 'components/user';

export const postError = async (error) => {
  const errorId = id();
  const errorBody = {
    code: error?.code,
    message: error?.message,
    time: new Date(),
  };
  const firebase = await fb();
  await firebase
    .database()
    .ref(ref + errorId)
    .update(errorBody)
    .catch((error) => console.log(error));
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
