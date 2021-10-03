import { useCallback } from 'react';
import { getDatabase, ref, child, set } from 'firebase/database';
import { error as reference } from 'components/user';

export const postError = async (error) => {
  const errorBody = {
    code: error?.code,
    message: error?.message,
    time: new Date(),
  };
  const database = getDatabase();
  const dbRef = ref(database);

  await set(child(dbRef, reference + errorBody.time), errorBody);
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
