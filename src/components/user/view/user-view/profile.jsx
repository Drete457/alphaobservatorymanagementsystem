import { useState, useLayoutEffect } from 'react';
import { CForm } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const [t] = useTranslation();
  const [pdfFile, setPdfFile] = useState(null);

  useLayoutEffect(() => {
    setPdfFile(null);
  }, []);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.profile.title')}</h1>
      </header>

      <main className="main-body">
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
