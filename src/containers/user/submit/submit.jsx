import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostUser } from '../../../hooks/users';
import Button from '../../button';
import userHandler from '../../../helpers/user';
import Loading from '../../loading';

const submit = (user, setErrorMsg, t, execute) => {
  if (!userHandler.validation(user, setErrorMsg, t)) {
    execute(user);
  }
};

const Submit = ({ cancelPage, user, setErrorMsg, setError }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostUser();

  useEffect(() => {
    if (data) {
      history.push('/');
    }
  }, [data, history]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [setError, error]);

  return (
    <>
      <div className="user-submit-buttons">
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.push(cancelPage)}
        />

        <Button
          name={t('btn.create-edit.submit')}
          isDanger={false}
          onClick={() => submit(user, setErrorMsg, t, execute)}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
