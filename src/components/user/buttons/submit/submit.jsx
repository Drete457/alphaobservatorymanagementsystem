import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { usePostUser } from 'hooks/users';
import { upload, deleteF } from 'hooks/files';
import Button from 'components/button';
import userHandler from 'helpers/user';
import Loading from 'components/loading';

const submit = (
  user,
  setErrorMsg,
  t,
  execute,
  setWasModified,
  executeUpload,
  executeDelete,
) => {
  if (!userHandler.validation(user, setErrorMsg, t)) {
    setWasModified(false);

    //put the position of the cards in the user before sending them to the back-end
    user.cardsPosition = JSON.parse(localStorage.getItem('cardsPosition'));
    localStorage.removeItem('cardsPosition');

    //if the user have a file send to backend
    if (user.profile) {
      const ref = 'profile/' + user.id + '.pdf';
      const file = user.profile;
      executeUpload(ref, file);
      user.profile = true;
    } else {
      const ref = 'profile/' + user.id + '.pdf';
      executeDelete(ref);
    }

    //send the user information for the backend
    execute(user);
  }
};

const Submit = ({ user, setErrorMsg, setError, setWasModified }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostUser();
  const {
    progress,
    error: errorUpload,
    data: dataUpload,
    execute: executeUpload,
  } = upload();
  const { execute: executeDelete } = deleteF();

  useEffect(() => {
    if (data) {
      history.push(`/user/view/${user.id}`);
    }
  }, [data, history, user]);

  useEffect(() => {
    if (error || errorUpload) {
      setError(error);
    }
  }, [setError, error, errorUpload]);

  return (
    <>
      {!dataUpload && <CProgress animated value={progress} className="mb-3" />}
      <div className="user-submit-buttons">
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.push('/users/')}
        />
        <Button
          name={t('btn.create-edit.submit')}
          isDanger={false}
          onClick={() =>
            submit(
              user,
              setErrorMsg,
              t,
              execute,
              setWasModified,
              executeUpload,
              executeDelete,
            )
          }
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
