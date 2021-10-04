import { useState, useEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { listUsers, generic, usersWithFollowers } from 'state/atoms';
import activitiesHandler from 'helpers/activities';
import CIcon from '@coreui/icons-react';

const DataTable = ({ activities, isLoading, list, setList }) => {
  const [t] = useTranslation();
  const [fields, setFields] = useState([]);
  const newUserWithActivities = [];

  const usersList = useRecoilValue(listUsers);
  const usersWithFollowersList = useRecoilValue(usersWithFollowers);
  const { activitiesType } = useRecoilValue(generic);

  if (list.length > 0) {
    list.forEach?.((user) => {
      if (user.numberOfActivities !== 0) {
        newUserWithActivities.push(user);
      }
    });
  }

  useEffect(() => {
    if (activities) {
      //generate the fields for the table
      const fieldsToShow = activitiesHandler.calendarToShow(activities, t);

      const newProperties = fieldsToShow.map((field) => {
        const property = field.key;
        return [property, ''];
      });

      //will use to track what fields have activities to show
      const objProperties = Object.fromEntries(newProperties);
      const newUsersList = [];

      usersList.forEach((user) => {
        if (user.id !== '1') {
          const followed = usersWithFollowersList.find(
            (value) => value.id === user.id,
          )?.followed;

          newUsersList.push({
            ...user,
            ...objProperties,
            followed: followed,
          });
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
              objProperties[activity.date] = true;
              numberOfActivities++;
            }
          });
        });
        newUsersList[index]['numberOfActivities'] = numberOfActivities;
      });

      //have the final fields the table will show
      const finalFields = [];

      fieldsToShow.forEach((field) => {
        if (objProperties[field.key] === true) {
          finalFields.push(field);
        }
      });

      setFields([
        {
          key: 'name',
          label: t('dates.fields.name'),
          _style: { width: '20%' },
        },
        {
          key: 'followed',
          label: t('user.fields.followed.title'),
          _style: { width: '20%' },
        },
        {
          key: 'numberOfActivities',
          label: t('user.fields.activities.title'),
        },
        ...finalFields.reverse(),
      ]);

      setList(newUsersList);
    }
  }, [
    activities,
    t,
    usersList,
    activitiesType,
    usersWithFollowersList,
    setList,
  ]);

  return (
    <CDataTable
      addTableClasses="home-table"
      items={newUserWithActivities}
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
      scopedSlots={{}}
    />
  );
};

export default DataTable;
