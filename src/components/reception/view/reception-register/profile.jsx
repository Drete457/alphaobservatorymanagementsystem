import { useState, useRef, useEffect } from 'react';
import { CForm } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { InputField } from 'components/user/input';
import Button from 'components/button';
import userHandler from 'helpers/user';

const ProfilePage = ({ user, setUser, setWasModified }) => {
  const [t] = useTranslation();
  const [pdfFile, setPdfFile] = useState(null);

  const inputFile = useRef(null);

  const onButtonClick = () => {
    if (pdfFile) {
      setPdfFile(null);
      user.profile = false;
      setUser(user);
    } else {
      inputFile.current.click();
    }
  };

  useEffect(() => {
    if (user?.profile) {
      const fileUrl = URL.createObjectURL(user.profile);
      setPdfFile(fileUrl);
    }
  }, [user, setUser]);

  return (
    <>
      <header>
        <h1 className="title">
          {t('pages.reception.registration-edit.profile.title')}
        </h1>
      </header>

      <main className="main-body">
        <InputField
          title={t('user.fields.profile.title')}
          name="profileUrl"
          placeholder={t('user.fields.profile.placeholder')}
          type="url"
          value={user?.profileUrl}
          onChange={(event) => {
            userHandler.userInputHandler(event, setUser, user);
            setWasModified(true);
          }}
          className="profile-input-format"
        />
        <input
          type="file"
          name="upload"
          ref={inputFile}
          accept="application/pdf"
          className="sr-only"
          onChange={(event) => {
            if (event.target.files[0]) {
              const file = event.target.files[0];
              const fileUrl = URL.createObjectURL(file);
              user.profile = file;
              setUser(user);
              setPdfFile(fileUrl);
            }
          }}
        />

        <div className="profile-button">
          <Button
            name={
              pdfFile
                ? t('btn.create-edit.profile.delete')
                : t('btn.create-edit.profile.insert')
            }
            isDanger={pdfFile ? true : false}
            onClick={onButtonClick}
          />
        </div>
        <CForm>
          {pdfFile && (
            <embed
              src={pdfFile}
              style={{ width: '100%', minHeight: '30rem', border: 'none' }}
            />
          )}
        </CForm>
      </main>
    </>
  );
};

export default ProfilePage;
