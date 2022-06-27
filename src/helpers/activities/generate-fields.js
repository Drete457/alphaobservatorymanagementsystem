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
          'b6fddec71394-0fc4f603-af3b986f-026fa186-b0f57c47439ac15c' ||
        activity.type ===
          '793122e47b9f-3e40a79d-a5b8baa7-45b05f2d-5850660056e1be88' ||
        activity.type ===
          'be8cd5bc9904-5c74cd34-e3480132-2b2cb338-9730677337fca7cd' ||
        activity.type ===
          'a7ac3113b917-df69f80d-2178772f-0b73565e-ec0dce91be7e8c2d' ||
        activity.type ===
          '8aded34d939e-89723401-a98ee567-8f6cf686-17cde00f92b08b84'
      ) {
        numberAlphaActivities++;
      }

      if (
        activity.type ===
          '68bfc3947dde-e0dd5abb-2a0ec68f-825f0c3e-620131ab5c2df458' ||
        activity.type ===
          'a3f33467f9e2-9f5f41d1-ade45059-670a07fe-1081efe10b3934be'
      ) {
        numberDirectCommunication++;
      }
    });

    newUsersList[index]['numberOfActivities'] = userActivitiesArray.length;
    newUsersList[index]['numberSurveyActivities'] = numberSurveyActivities;
    newUsersList[index]['numberAlphaActivities'] = numberAlphaActivities;
    newUsersList[index]['numberDirectCommunication'] =
      numberDirectCommunication;
    newUsersList[index]['numberOfThematicActivities'] =
      numberAlphaActivities + numberDirectCommunication;
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
        key: 'contacted',
        label: t('user.fields.contacted.title'),
      },
      {
        key: 'firstActivity',
        label: t('user.fields.firstActivity.title'),
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
        key: 'numberOfThematicActivities',
        label: t('user.fields.thematicActivities.title'),
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

      {
        key: 'country',
        label: t('user.fields.country.title'),
      },
      {
        key: 'socialInfo',
        label: t('user.fields.social.title'),
      },
      {
        key: 'training',
        label: t('user.fields.training.title'),
      },
      {
        key: 'personality',
        label: t('user.fields.personality.title'),
      },
      {
        key: 'second',
        label: t('user.fields.second.title'),
      },
      {
        key: 'reservation',
        label: t('user.fields.cards.reservation'),
      },
      {
        key: 'introductionOption',
        label: t('user.fields.introduction.option.title'),
      },
      {
        key: 'cardsInfo',
        label: t('user.fields.cards.title'),
      },
      {
        key: 'baseAmbit',
        label: t('user.fields.ambit.entry'),
      },
      {
        key: 'invitationAlphaCafe',
        label: t('user.fields.invitationAlphaCafe.title'),
      },
      {
        key: 'gender',
        label: t('user.fields.gender.title'),
      },
      {
        key: 'groupAge',
        label: t('user.fields.groupAge.title'),
      },
      {
        key: 'employment',
        label: t('user.fields.employment.title'),
      },
      {
        key: 'typeSurvey',
        label: t('user.fields.survey.type.title'),
      },
    ],

    usersToTable: newUsersList,
  };

  return obj;
};

export default generateFields;
