import { useState, useEffect } from 'react';
import { CForm, CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { download } from 'hooks/files';
import ErrorInfo from 'components/error';

const ProfilePage = ({ user }) => {
  const [t] = useTranslation();
  const [pdfFile, setPdfFile] = useState(null);
  const { progress, error, data, execute } = download();

  useEffect(() => {
    if (user && user.profile) {
      const ref = 'profile/' + user.id + '.pdf';
      execute(ref, setPdfFile);
    }
  }, [execute, user]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.user.view.profile.title')}</h1>
          </header>

          <main className="main-body">
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
