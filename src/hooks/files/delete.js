import { useCallback } from 'react';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export const deleteF = async (reference) => {
  //create store ref
  const storage = getStorage();
  const storageRef = ref(storage, reference);

  //delete the file
  await deleteObject(storageRef).catch((e) => {
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
