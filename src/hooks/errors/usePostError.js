import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from 'state/atoms';
import id from 'helpers/id-generator';
import { error as ref } from 'components/user';

export const postSocial = async (communication, error) => {
  const errorId = id();
  const errorBody = {
    code: error?.code,
    message: error?.message,
    user: error?.email,
    credentional: error?.credential,
    time: new Date(),
  };

  await communication
    .database()
    .ref(ref + errorId)
    .update(errorBody)
    .catch((error) => console.log(error));
};

const usePostSocial = () => {
  const communication = useRecoilValue(api);

  const execute = async (error) => {
    try {
      postSocial(communication, error);
    } catch (e) {}
  };

  return {
    execute: useCallback(execute, [communication]),
  };
};

export default usePostSocial;
