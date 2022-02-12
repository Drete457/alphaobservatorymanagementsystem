import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, countries, generic } from 'state/atoms';
import { useGetActivities } from 'hooks/activities';
import { DynamicGrid } from 'helpers/dynamic-table';
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
  const [isDynamicTable, setDynamicTable] = useState(false);
  const [gridApi, setGridApi] = useState(null);

  const { isLoading, error, data, execute } = useGetActivities();

  const { collaborators, usersWithFollowers } = useRecoilValue(users);
  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

  const onBtForEachLeafNode = () => {
    const newArray = [];

    gridApi.forEachNodeAfterFilterAndSort((node) => newArray.push(node.data));

    return newArray;
  };

  const updateDynamicTableRegisteredNumber = () => {
    const newArray = [];

    if (gridApi) {
      gridApi.forEachNodeAfterFilterAndSort((node) => newArray.push(node.data));

      setRegisteredNumber(newArray.length);
    }
  };

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

      const usersWithOutEmptyStrings = usersToTable?.map((user) => {
        const newUser = { ...user };

        for (const key in newUser) {
          if (newUser[key] === '') {
            newUser[key] = ' ';
          }
        }

        return newUser;
      });

      setFields(fieldsToTable);
      setList(usersWithOutEmptyStrings);
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
              <div className="users-button">
                {isDynamicTable ? (
                  <Button
                    name={t('btn.dynamic.false')}
                    onClick={() => setDynamicTable(false)}
                    className="activity-button"
                  />
                ) : (
                  <Button
                    name={t('btn.dynamic.true')}
                    onClick={() => setDynamicTable(true)}
                    className="activity-button"
                  />
                )}
                <Button
                  name={t('btn.create.excel')}
                  onClick={() =>
                    activitiesHandler.exportToExcel(
                      isDynamicTable ? onBtForEachLeafNode() : tableToExcel,
                      t,
                    )
                  }
                  className="activity-button"
                />
              </div>
            </nav>
            <hr />

            {isDynamicTable ? (
              <div className="ag-theme-alpine" style={{ height: '50vw' }}>
                <DynamicGrid
                  data={list}
                  fieldsTable={fields}
                  setGridApi={setGridApi}
                  updateDynamicTableRegisteredNumber={
                    updateDynamicTableRegisteredNumber
                  }
                />
              </div>
            ) : (
              <DataTable
                fields={fields}
                list={activitiesHandler.collaboratorsWithActivities(list)}
                isLoading={isLoading}
                setRegisteredNumber={setRegisteredNumber}
                setTabletoExcel={setTabletoExcel}
              />
            )}
          </main>
        </>
      )}
    </>
  );
};

export default CollaboratorsTable;
