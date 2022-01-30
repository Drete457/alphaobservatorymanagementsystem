import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, countries, generic } from 'state/atoms';
import { useGetActivities } from 'hooks/activities';
import DataTable from 'components/activities/colaboratos-table';
import ErrorInfo from 'components/error';
import Button from 'components/button';
import activitiesHandler from 'helpers/activities';
import homeHandler from 'helpers/users';

const CollaboratorsTable = () => {
  const [t] = useTranslation();
  const [usersDataInfo, setUsersDataInfo] = useState(null);
  const [list, setList] = useState([]);
  const [fields, setFields] = useState([]);
  const [registeredNumber, setRegisteredNumber] = useState(0);
  const [tableToExcel, setTabletoExcel] = useState({});

  const { isLoading, error, data, execute } = useGetActivities();

  const { collaborators, usersWithFollowers } = useRecoilValue(users);
  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (collaborators && countriesList && genericList) {
      homeHandler.buildUserList(
        collaborators,
        usersWithFollowers,
        countriesList,
        genericList,
        setUsersDataInfo,
      );
    }
  }, [collaborators, usersWithFollowers, countriesList, genericList]);

  useLayoutEffect(() => {
    if (data && usersDataInfo) {
      const { fieldsToTable, usersToTable } = activitiesHandler.generateFields(
        data,
        usersDataInfo,
        t,
        genericList?.activitiesType,
      );

      setFields(fieldsToTable);
      setList(usersToTable);
    }
  }, [data, t, usersDataInfo, genericList]);

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
              {t('pages.activities.collaborators-table-title') +
                ': ' +
                registeredNumber}
              <Button
                name={t('btn.create.excel')}
                onClick={() => activitiesHandler.exportToExcel(tableToExcel, t)}
                className="activity-button"
              />
            </nav>
            <hr />
            <DataTable
              fields={fields}
              list={list}
              isLoading={isLoading}
              setRegisteredNumber={setRegisteredNumber}
              setTabletoExcel={setTabletoExcel}
            />
          </main>
        </>
      )}
    </>
  );
};

export default CollaboratorsTable;
