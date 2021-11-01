import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { user as userInfo } from 'state/atoms';
import { usePostReceptionCard } from 'hooks/reception';
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
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const isUser = useRecoilValue(userInfo);
  const { isLoading, error, data, execute } = usePostReceptionCard();
  const {
    progress,
    error: errorUpload,
    data: dataUpload,
    execute: executeUpload,
  } = upload();
  const { execute: executeDelete } = deleteF();

  useEffect(() => {
    if (data) {
      history.push(`/reception/view`);
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
          onClick={() => history.push('/reception/view')}
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
