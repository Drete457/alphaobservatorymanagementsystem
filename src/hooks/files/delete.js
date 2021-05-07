import { useCallback } from 'react';
import { fb } from 'api';

export const deleteF = async (ref) => {
  const firebase = await fb();
  //create store ref
  const storageRef = firebase.storage().ref(ref);

  //delete the file
  storageRef.delete();
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
