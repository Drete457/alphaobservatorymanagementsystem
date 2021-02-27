const validateTotalUser = (user, setError, t) => {
  let errors = {};
  let haveErrors = false;

  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    return true;
  }

  for (var attr in user) {
    errors[attr] = '';
  }

  if (user?.name === '') {
    errors.name = t('user.fields.name.error');
    haveErrors = true;
  }

  setError(errors);

  return haveErrors;
};

export default validateTotalUser;
