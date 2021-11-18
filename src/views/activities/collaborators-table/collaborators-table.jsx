import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetActivities } from 'hooks/activities';
import DataTable from 'components/activities/colaboratos-table';
import ErrorInfo from 'components/error';
import Button from 'components/button';
import activitiesHandler from 'helpers/activities';

const CollaboratorsTable = () => {
  const [t] = useTranslation();
  const [list, setList] = useState([]);
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
              {t('pages.activities.collaborators-table-title')}
              <Button
                name={t('btn.create.excel')}
                onClick={() => activitiesHandler.exportToExcel(list, t)}
                className="activity-button"
              />
            </nav>
            <hr />
            <DataTable
              activities={data}
              isLoading={isLoading}
              list={list}
              setList={setList}
            />
          </main>
        </>
      )}
    </>
  );
};

export default CollaboratorsTable;
