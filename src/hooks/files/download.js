import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from 'state/atoms';

export const download = async (
  communication,
  ref,
  setProgress,
  setError,
  setData,
  setPdfFile,
) => {
  //create store ref
  const storageRef = communication.storage().ref(ref);

  //download file
  storageRef
    .getDownloadURL()
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
  const communication = useRecoilValue(api);

  const execute = async (ref) => {
    try {
      setData(false);
      download(communication, ref, setProgress, setError, setData);
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

export default useDownload;
