import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../../state/atoms';
import id from '../../helpers/id-generator';

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
    .ref('/error/' + errorId)
    .update(errorBody);
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
