//import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { activityList } from 'state/selectors';
import DataTable from 'components/activities/table';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Button from 'components/button';

const ActivitiesTable = () => {
  const [t] = useTranslation();
  const history = useHistory();
  // const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  const loading = false;
  const error = null;

  //TODO: retirar isto assim que o backend tiver a funcionar
  const activitiesList = useRecoilValue(activityList);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.activities.title')}</h1>
          </header>

          <main>
            <hr />
            <nav className="activity-nav h3">
              {t('pages.activities.table-title')}
              <Button
                name={t('btn.create.activities')}
                onClick={() => history.push(`/activities_table/new_activitie`)}
                className="activity-button"
              />
            </nav>
            <hr />
            <DataTable activities={activitiesList} />
          </main>
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default ActivitiesTable;
