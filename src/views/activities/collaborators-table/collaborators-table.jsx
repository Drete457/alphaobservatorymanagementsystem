import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, countries, generic } from 'state/atoms';
import { useGetActivities, useGetActivitiesByDate } from 'hooks/activities';
import { DynamicGrid } from 'helpers/dynamic-table';
import DataTable from 'components/activities/colaboratos-table';
import { useDatePicker } from 'components/activities/date-picker';
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
  const {
    isLoading: isLoadingByDate,
    error: errorByDate,
    data: dataByDate,
    execute: executeByDate,
  } = useGetActivitiesByDate();

  const { collaborators, usersWithFollowers } = useRecoilValue(users);
  const { beginDate, endDate, renderDatePicker: DatePicker } = useDatePicker();
  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  console.log(dataByDate);
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
    if ((beginDate, endDate)) executeByDate(beginDate, endDate);
  }, [beginDate, endDate, executeByDate]);

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
    if ((data && usersDataInfo) || (dataByDate && usersDataInfo)) {
      const dataToShow = beginDate && endDate ? dataByDate : data;

      const { fieldsToTable, usersToTable } = activitiesHandler.generateFields(
        dataToShow,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, t, usersDataInfo, genericList, dataByDate]);

  return (
    <>
      {error || errorByDate ? (
        <ErrorInfo error={error || errorByDate} />
      ) : (
        <>
          <header className="d-flex justify-content-between align-items-center">
            <h1 className="title">{t('pages.activities.title')}</h1>
            <DatePicker />
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
              <div className="ag-theme-alpine-dark" style={{ height: '50vw' }}>
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
                isLoading={isLoading || isLoadingByDate}
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
