const validateActivities = (newActivitie, setErrorActivity, haveExtra, t) => {
  let errors = {};
  let haveErrors = false;

  if (
    !newActivitie ||
    typeof newActivitie !== 'object' ||
    Array.isArray(newActivitie)
  ) {
    return true;
  }

  for (let attr in newActivitie) {
    errors[attr] = '';
  }

  if (newActivitie?.type === '') {
    errors.type = t('activities.fields.type.error');
    haveErrors = true;
  }

  if (newActivitie?.list === '') {
    errors.list = t('activities.fields.list.error');
    haveErrors = true;
  }

  if (haveExtra && newActivitie.list.length !== newActivitie.listInfo.length) {
    errors.listInfo = t('activities.fields.listInfo.error');
    haveErrors = true;
  }

  setErrorActivity(errors);

  return haveErrors;
};

export default validateActivities;
