import { useState, useEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { generic } from 'state/atoms';
import activitiesHandler from 'helpers/activities';
import homeHandler from 'helpers/users';
import CIcon from '@coreui/icons-react';

const DataTable = ({ activities, isLoading }) => {
  const [t] = useTranslation();
  const history = useHistory();
  const [list, setList] = useState([]);

  const { activitiesType } = useRecoilValue(generic);

  useEffect(() => {
    if (activities) {
      const filterList = activities.map((activity) => {
        const activityFilter = activitiesType.find(
          (value) => value.id === activity.type,
        );

        return {
          id: activity.id,
          name: activityFilter.name + ' ' + activity.date,
          type: activityFilter.name,
          participants: activity.list.length,
          date: activity.date,
        };
      });

      const filterListSort = filterList.sort?.((val1, val2) =>
        homeHandler.sortList(val1, val2, 'date'),
      );

      setList(filterListSort.reverse());
    }
  }, [activities, activitiesType]);

  return (
    <CDataTable
      addTableClasses="home-table"
      items={list}
      fields={activitiesHandler.fields(t)}
      clickableRows
      columnFilter
      tableFilter
      hover
      striped
      sorter
      size="sm"
      responsive
      itemsPerPageSelect
      itemsPerPage={25}
      pagination={true}
      isLoading={isLoading}
      noItemsViewSlot={
        <div className="text-center my-5">
          <h2>
            {t('pages.activities.no-info')}
            <CIcon width="30" name="cilBan" className="text-danger mb-2" />
          </h2>
        </div>
      }
      onRowClick={(item) =>
        history.push(`/activities/activities_table/view/${item.id}`)
      }
    />
  );
};

export default DataTable;
