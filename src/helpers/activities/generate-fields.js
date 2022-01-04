import calendarToShow from './old-newest-activities';

const generateFields = (activities, usersDataInfo, t, activitiesType) => {
  //generate the fields for the table
  const fieldsToShow = calendarToShow(activities, t);

  const newProperties = fieldsToShow.map((field) => {
    const property = field.key;
    return [property, ''];
  });

  //will use to track what fields have activities to show
  const objProperties = Object.fromEntries(newProperties);
  const newUsersList = [];

  usersDataInfo?.forEach((user) => {
    newUsersList.push({
      ...user,
      ...objProperties,
    });
  });

  newUsersList.forEach((user, index) => {
    let numberSurveyActivities = 0;
    let numberAlphaActivities = 0;
    let numberDirectCommunication = 0;

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

      if (
        activity.type ===
        '68bfc3947dde-e0dd5abb-2a0ec68f-825f0c3e-620131ab5c2df458'
      ) {
        numberDirectCommunication++;
      }
    });

    newUsersList[index]['numberOfActivities'] = userActivitiesArray.length;
    newUsersList[index]['numberSurveyActivities'] = numberSurveyActivities;
    newUsersList[index]['numberAlphaActivities'] = numberAlphaActivities;
    newUsersList[index]['numberDirectCommunication'] =
      numberDirectCommunication;
  });

  //have the final fields the table will show
  const finalFields = [];

  fieldsToShow.forEach((field) => {
    if (objProperties[field.key] === true) {
      finalFields.push(field);
    }
  });

  const obj = {
    fieldsToTable: [
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
      {
        key: 'numberDirectCommunication',
        label: t('user.fields.activitiesDirectCommunication.title'),
      },

      ...finalFields.reverse(),
    ],

    usersToTable: newUsersList,
  };

  return obj;
};

export default generateFields;
