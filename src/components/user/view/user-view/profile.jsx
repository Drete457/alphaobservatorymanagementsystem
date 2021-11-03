import { useEffect } from 'react';
import { CForm, CProgress } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { download } from 'hooks/files';
import { InputField } from 'components/user/input';
import ErrorInfo from 'components/error';

{
  /* <InputField
  title={t('user.fields.profile.title')}
  name="profileUrl"
  type="url"
  value={user?.profileUrl}
  className="profile-input-format"
  disabled
/> */
}

const ProfilePage = ({ user }) => {
  const link = user?.profileUrl ? user.profileUrl : '';
  const [t] = useTranslation();
  const { progress, error, data, execute } = download();

  useEffect(() => {
    if (user && user?.profile) {
      const ref = 'profile/' + user.id + '.pdf';
      execute(ref);
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
            <section className="profile-input-format">
              <label className="mr-2">{t('user.fields.profile.title')}</label>
              <a href={link} rel="noopener noreferrer" target="_blank">
                {`${link}`}
              </a>
            </section>
            <CForm>
              {!data && (
                <CProgress animated value={progress} className="mb-3" />
              )}
              {data && (
                <embed
                  src={data}
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
