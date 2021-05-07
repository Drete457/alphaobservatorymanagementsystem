import { useState, useCallback } from 'react';
import { fb } from 'api';

export const upload = async (ref, file, setProgress, setError, setData) => {
  const firebase = await fb();
  //create store ref
  const storageRef = firebase.storage().ref(ref);

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

  const execute = async (ref, file) => {
    try {
      setData(false);
      upload(ref, file, setProgress, setError, setData);
    } catch (e) {
      setError(e);
    }
  };

  return {
    progress,
    error,
    data,
    execute: useCallback(execute, []),
  };
};

export default useUpload;
