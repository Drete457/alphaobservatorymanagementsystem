import { useState, useRef } from 'react';
import { CForm } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';

const ProfilePage = () => {
  const [t] = useTranslation();
  const [pdfFile, setPdfFile] = useState(null);

  const inputFile = useRef(null);

  const onButtonClick = () => {
    if (pdfFile) {
      setPdfFile(null);
    } else {
      inputFile.current.click();
    }
  };

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
              const file = URL.createObjectURL(event.target.files[0]);
              setPdfFile(file);
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
          <embed
            src={pdfFile}
            style={{ width: '100%', minHeight: '30rem', border: 'none' }}
          />
        </CForm>
      </main>
    </>
  );
};

export default ProfilePage;
