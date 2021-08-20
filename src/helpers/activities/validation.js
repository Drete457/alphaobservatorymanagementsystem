import yearValidation from 'helpers/year-validation';

const validateActivities = (newActivity, setErrorActivity, haveExtra, t) => {
  let errors = {};
  let haveErrors = false;

  if (
    !newActivity ||
    typeof newActivity !== 'object' ||
    Array.isArray(newActivity)
  ) {
    return true;
  }

  for (let attr in newActivity) {
    errors[attr] = '';
  }

  if (newActivity?.type === '') {
    errors.type = t('activities.fields.type.error');
    haveErrors = true;
  }

  if (!newActivity?.date) {
    errors.date = t('activities.fields.date.error');
    haveErrors = true;
  }

  if (newActivity?.date !== '' && yearValidation(newActivity?.date)) {
    errors.date = t('activities.fields.date.error');
    haveErrors = true;
  }

  if (newActivity?.list === '' || newActivity?.list.length === 0) {
    errors.list = t('activities.fields.list.error');
    haveErrors = true;
  }

  setErrorActivity(errors);

  return haveErrors;
};

export default validateActivities;
