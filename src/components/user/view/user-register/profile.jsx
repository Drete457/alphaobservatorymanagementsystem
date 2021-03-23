import { useState, useRef, useEffect } from 'react';
import { CForm, CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { upload } from 'hooks/files';
import Button from 'components/button';
import ErrorInfo from 'components/error';

const ProfilePage = ({ user, setUser }) => {
  const [t] = useTranslation();
  const [pdfFile, setPdfFile] = useState(null);
  const { progress, error, data, execute } = upload();

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
    if (data) {
      user.profile = true;
      setUser(user);
    }
  }, [data, user, setUser]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">
              {t('pages.user.registration.profile.title')}
            </h1>
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
                  const ref = 'profile/' + user.id + '.pdf';
                  setPdfFile(fileUrl);
                  execute(ref, file);
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
              {!data && (
                <CProgress animated value={progress} className="mb-3" />
              )}
              {data && (
                <embed
                  src={pdfFile}
                  style={{ width: '100%', minHeight: '30rem', border: 'none' }}
                />
              )}
            </CForm>
          </main>
        </>
      )}
    </>
  );
};

export default ProfilePage;
