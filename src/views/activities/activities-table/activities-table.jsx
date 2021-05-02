import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import DataTable from 'components/activities/table/data-table';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Button from 'components/button';

const ActivitiesTable = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            <nav className="home-nav h3">
              {t('pages.users.table-title')}
              <Button
                name={t('btn.create.activities')}
                onClick={() => history.push(`/activities_table/new_activitie`)}
                className="home-button"
              />
            </nav>
            <hr />
            <DataTable />
          </main>
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default ActivitiesTable;
