import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetActivities } from 'hooks/activities';
import DataTable from 'components/activities/colaboratos-table';
import ErrorInfo from 'components/error';
import Button from 'components/button';

const ColaboratorsTable = () => {
  const [t] = useTranslation();

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
              {t('pages.activities.colaborators-table-title')}
              <Button
                name={t('btn.create.excel')}
                onClick={() => {}}
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

export default ColaboratorsTable;
