import { useState, useEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, generic } from 'state/atoms';
import activitiesHandler from 'helpers/activities';
import CIcon from '@coreui/icons-react';

const DataTable = ({ activities, isLoading, list, setList }) => {
  const [t] = useTranslation();
  const [fields, setFields] = useState([]);
  const newUserWithActivities = [];

  const { usersDataInfo: usersList } = useRecoilValue(users);
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

      usersList?.forEach((user) => {
        if (user.id !== '1') {
          const userInfo = usersList.find((value) => value.id === user.id);

          newUsersList.push({
            ...userInfo,
            ...objProperties,
          });
        }
      });

      newUsersList.forEach((user, index) => {
        let numberSurveyActivities = 0;
        let numberAlphaActivities = 0;

        const userActivitiesArray = activities.filter((activity) =>
          activity.list.find((userId) => userId === user.id),
        );

        userActivitiesArray.forEach((activity) => {
          const typeName = activitiesType.find(
            (value) => value.id === activity.type,
          ).name;
          newUsersList[index][activity.date] = typeName;
          objProperties[activity.date] = true;

          if (
            activity.type ===
            '5fe99008264a-cdda524c-2f527cde-f32714c5-5382d15fe52bd910'
          ) {
            numberSurveyActivities++;
          }

          if (
            activity.type ===
            'b6fddec71394-0fc4f603-af3b986f-026fa186-b0f57c47439ac15c'
          ) {
            numberAlphaActivities++;
          }
        });

        /* activities.forEach((activity) => {
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
        }); */
        newUsersList[index]['numberOfActivities'] = userActivitiesArray.length;
        newUsersList[index]['numberSurveyActivities'] = numberSurveyActivities;
        newUsersList[index]['numberAlphaActivities'] = numberAlphaActivities;
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
        },
        {
          key: 'followed',
          label: t('user.fields.followed.title'),
        },
        {
          key: 'numberOfActivities',
          label: t('user.fields.activities.title'),
        },
        {
          key: 'numberSurveyActivities',
          label: t('user.fields.activitiesSurvey.title'),
        },
        {
          key: 'numberAlphaActivities',
          label: t('user.fields.activitiesAlpha.title'),
        },

        ...finalFields.reverse(),
      ]);

      setList(newUsersList);
    }
  }, [activities, t, usersList, activitiesType, setList]);

  return (
    <CDataTable
      addTableClasses="users-table"
      items={newUserWithActivities}
      fields={fields}
      columnFilter
      tableFilter
      footer
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
    />
  );
};

export default DataTable;
