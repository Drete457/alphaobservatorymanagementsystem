import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetActivities } from 'hooks/activities';
import DataTable from 'components/activities/table';
import ErrorInfo from 'components/error';
import Button from 'components/button';

const ActivitiesTable = () => {
  const [t] = useTranslation();
  const history = useHistory();

  const { isLoading, error, data, execute } = useGetActivities();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

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
                onClick={() => history.push(`/activities_table/new_activity`)}
                className="activity-button"
              />
            </nav>
            <hr />
            <DataTable activities={data} isLoading={isLoading} />
          </main>
        </>
      )}
    </>
  );
};

export default ActivitiesTable;
