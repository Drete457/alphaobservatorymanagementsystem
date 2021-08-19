import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/* import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';
import Loading from 'components/loading';
 */
const Home = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/users');
  }, [history]);

  /* const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const linkGoogleCalendar =
    'https://docs.google.com/spreadsheets/d/1BDo7-qqpRMryKrl_1wjKRAkSjGLEVRnp8sYS-Ihbj6I/edit?usp=sharing';

  return (
    <>
      <header>
        <h1 className="title">{t('pages.home.title')}</h1>
        <div className="calendar-open-view-button">
          <Button
            name={t('btn.home.calendar-button')}
            onClick={() => {
              window.open(linkGoogleCalendar);
            }}
          />
        </div>
      </header>

      <main>
        <div className="calendar-view">
          <iframe
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            width="100%"
            height="100%"
            onLoad={() => setIsLoading(false)}
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRd0HowpECfuzV41VbVSKlQJUsWm8QyTkb8iwbYdraEuhq1yq0DPnIQF13rbHhNEjHZeH43SImtORkt/pubhtml?gid=1429204120&amp;single=true&amp;widget=true&amp;headers=false"
            title={t('pages.home.calendar')}
          ></iframe>
        </div>
        {isLoading && <Loading />}
      </main>
    </>
  ); */
  return <></>;
};

export default Home;
