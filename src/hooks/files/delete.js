import { useCallback } from 'react';
import { fb } from 'api';

export const deleteF = async (ref) => {
  const firebase = await fb();

  //create store ref
  firebase
    .storage()
    .ref(ref)
    .delete() //delete the file
    .catch((e) => {
      /* if the file doesn't exist, it doesn't matter to inform the user. */
    });
};

const useDelete = () => {
  const execute = async (ref) => {
    try {
      deleteF(ref);
    } catch (e) {}
  };

  return {
    execute: useCallback(execute, []),
  };
};

export default useDelete;
