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

  const usersList = useRecoilValue(listUsers);
  const { activitiesType } = useRecoilValue(generic);

  useEffect(() => {
    if (activities) {
      //generate the fields for the table
      const fieldsToShow = activitiesHandler.calendarToShow(activities, t);

      setFields([
        {
          key: 'name',
          label: t('dates.fields.name'),
          _style: { width: '15%' },
        },
        ...fieldsToShow.reverse(),
      ]);

      const newProperties = fieldsToShow.map((field) => {
        const property = field.key;
        return [property, ''];
      });
      const objProperties = Object.fromEntries(newProperties);
      const newUsersList = [];

      usersList.forEach((user) => {
        if (user.id !== '1') {
          newUsersList.push({ ...user, ...objProperties });
        }
      });

      newUsersList.forEach((user, index) => {
        let numberOfActivities = 0;

        activities.forEach((activity) => {
          activity.list.forEach((userId) => {
            if (userId === user.id) {
              const typeName = activitiesType.find(
                (value) => value.id === activity.type,
              ).name;
              newUsersList[index][activity.date] = typeName;
              numberOfActivities++;
            }
          });
        });
        newUsersList[index][numberOfActivities] = numberOfActivities;
      });

      setList(newUsersList);
    }
  }, [activities, t, usersList, activitiesType]);

  return (
    <CDataTable
      addTableClasses="home-table"
      items={list}
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
