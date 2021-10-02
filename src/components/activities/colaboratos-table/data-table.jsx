import { useState, useEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { listUsers, generic } from 'state/atoms';
import activitiesHandler from 'helpers/activities';
import Button from 'components/button';
import CIcon from '@coreui/icons-react';

const DataTable = ({ activities, isLoading }) => {
  const [t] = useTranslation();
  const history = useHistory();
  const [fields, setFields] = useState([]);
  const [list, setList] = useState([]);

  const userList = useRecoilValue(listUsers);
  const { activitiesType } = useRecoilValue(generic);

  useEffect(() => {
    if (activities) {
      const fieldsToShow = activitiesHandler.calendarToShow(activities, t);

      setFields(fieldsToShow.reverse());
    }
  }, [activities, t]);
  /*  useEffect(() => {
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

      setList(filterList);
    }
  }, [activities, activitiesType]); */

  return (
    <CDataTable
      addTableClasses="home-table"
      items={[]}
      fields={fields}
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
      scopedSlots={{
        view: (item) => {
          return (
            <td>
              <Button
                name={t('btn.view')}
                onClick={() =>
                  history.push(`/activities_table/view/${item.id}`)
                }
                className="home-button"
              />
            </td>
          );
        },
      }}
    />
  );
};

export default DataTable;
