import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from 'state/atoms';

export const deleteF = async (communication, ref) => {
  //create store ref
  const storageRef = communication.storage().ref(ref);

  //delete the file
  storageRef.delete();
};

const useDelete = () => {
  const communication = useRecoilValue(api);

  const execute = async (ref) => {
    deleteF(communication, ref);
  };

  return {
    execute: useCallback(execute, [communication]),
  };
};

export default useDelete;
