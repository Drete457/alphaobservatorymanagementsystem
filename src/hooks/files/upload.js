import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from 'state/atoms';

export const upload = async (
  communication,
  ref,
  file,
  setProgress,
  setError,
  setData,
) => {
  //create store ref
  const storageRef = communication.storage().ref(ref);

  //upload the file
  const task = storageRef.put(file);

  //update the progress bar
  task.on(
    'state_changed',
    function progress(snapshot) {
      const percentage =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    },

    function error(error) {
      setError(error);
    },

    function complete() {
      setData(true);
    },
  );
};

const useUpload = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  const communication = useRecoilValue(api);

  const execute = async (ref, file) => {
    try {
      setData(false);
      upload(communication, ref, file, setProgress, setError, setData);
    } catch (e) {
      setError(e);
    }
  };

  return {
    progress,
    error,
    data,
    execute: useCallback(execute, [communication]),
  };
};

export default useUpload;
