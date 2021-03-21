import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostUser } from '../../../../hooks/users';
import Button from '../../../button';
import userHandler from '../../../../helpers/user';
import Loading from '../../../loading';

const submit = (user, setErrorMsg, t, execute, setWasModified) => {
  if (!userHandler.validation(user, setErrorMsg, t)) {
    setWasModified(false);

    //put the position of the cards in the user before sending them to the back-end
    user.cardsPosition = JSON.parse(localStorage.getItem('cardsPosition'));
    localStorage.removeItem('cardsPosition');

    //send the user information for the backend
    execute(user);
  }
};

const Submit = ({ user, setErrorMsg, setError, setWasModified }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostUser();

  useEffect(() => {
    if (data) {
      history.push(`/user/view/${user.id}`);
    }
  }, [data, history, user]);

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
          onClick={() => history.push('/users/')}
        />

        <Button
          name={t('btn.create-edit.submit')}
          isDanger={false}
          onClick={() => submit(user, setErrorMsg, t, execute, setWasModified)}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
