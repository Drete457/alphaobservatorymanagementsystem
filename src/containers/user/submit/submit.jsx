import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../button';
import userHandler from '../../../helpers/user';
import { usePostUser } from '../../../hooks/users';
import Loading from '../../loading';

const submit = (user, setErrorMsg, t, execute) => {
  if (!userHandler.validation(user, setErrorMsg, t)) {
    //execute(user);
  }
};

const Submit = ({ cancelPage, user, setErrorMsg }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostUser();

  useEffect(() => {
    if (data) {
      history.push('/');
    }
  }, [data, history]);

  return (
    <>
      <div className="user-submit-buttons">
        <Button
          name="Cancel"
          isDanger={true}
          onClick={() => history.push(cancelPage)}
        />

        <Button
          name="Submit"
          isDanger={false}
          onClick={() => submit(user, setErrorMsg, t, execute)}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
