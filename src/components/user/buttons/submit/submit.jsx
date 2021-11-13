import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { user as userInfo } from 'state/atoms';
import { usePostUser } from 'hooks/users';
import { upload, deleteF } from 'hooks/files';
import Button from 'components/button';
import Loading from 'components/loading';
import userHandler from 'helpers/user';
import dateGenerator from 'helpers/date-generator';

const submit = (
  user,
  setErrorMsg,
  t,
  execute,
  setWasModified,
  executeUpload,
  executeDelete,
  isUser,
) => {
  if (!userHandler.validation(user, setErrorMsg, t)) {
    setWasModified(false);

    //put the position of the cards in the user before sending them to the back-end
    user.cardsPosition = JSON.parse(sessionStorage.getItem('cardsPosition'));
    sessionStorage.removeItem('cardsPosition');

    user.name = user.name.trim();

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

    if (!user?.createDate) {
      user.createDate = dateGenerator();
      user.createUser = isUser.email;
    }

    if (!user?.lastModification) {
      user.lastModification = [];
    }

    user.lastModification.push({ email: isUser.email, date: dateGenerator() });

    //send the user information for the backend
    execute(user);
  }
};

const Submit = ({
  user,
  setErrorMsg,
  setError,
  setWasModified,
  validName = true,
  hour,
  timeZone,
}) => {
  const history = useHistory();
  const [t] = useTranslation();

  const isUser = useRecoilValue(userInfo);
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
        {timeZone && hour && (
          <span className="align-self-center">
            {t('user.fields.hour.title')}: {hour.tz(timeZone).format('HH:mm')}h
          </span>
        )}
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.push('/users/')}
        />
        {validName && (
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
                isUser,
              )
            }
          />
        )}
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
