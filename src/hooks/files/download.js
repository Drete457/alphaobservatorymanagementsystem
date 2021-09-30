import { useState, useCallback } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const download = async (reference, setProgress, setError, setData) => {
  const storage = getStorage();
  //create store ref
  const storageRef = ref(storage, reference);

  //download file
  await getDownloadURL(storageRef)
    .then((url) => {
      //download function
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentage = (e.loaded / e.total) * 100;
          setProgress(percentage);
        }
      };
      xhr.onload = (e) => {
        let fileBlob = xhr.response;
        const fileUrl = URL.createObjectURL(fileBlob);
        setData(fileUrl);
      };
      xhr.send();
    })
    .catch((error) => setError(error));
};

const useDownload = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  const execute = async (ref) => {
    try {
      setData(false);
      download(ref, setProgress, setError, setData);
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

export default useDownload;
