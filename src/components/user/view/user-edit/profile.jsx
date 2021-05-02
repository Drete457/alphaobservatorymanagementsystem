import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { CForm, CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { download } from 'hooks/files';
import Button from 'components/button';

const ProfilePage = ({ user, setUser, setError }) => {
  const [t] = useTranslation();
  const [pdfFile, setPdfFile] = useState(null);
  const { progress, error, data, execute } = download();

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

  useLayoutEffect(() => {
    if (user && user.profile) {
      const ref = 'profile/' + user.id + '.pdf';
      execute(ref);
    }
  }, [execute, user]);

  useEffect(() => {
    if (data) {
      setPdfFile(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.edit.profile.title')}</h1>
      </header>

      <main className="main-body">
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
          {!data && <CProgress animated value={progress} className="mb-3" />}
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
