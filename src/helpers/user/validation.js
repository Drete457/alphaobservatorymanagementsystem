const yearValidation = (dateString) => {
  if (dateString === undefined) {
    return false;
  }

  const end = dateString.indexOf('-');
  const yearString = dateString.substring(0, end);
  const yearNumber = parseInt(yearString);

  if (yearNumber < 2010 || yearNumber > 2060) {
    return true;
  }

  return false;
};

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

  if (user?.community !== '' && yearValidation(user.community)) {
    errors.community = t('user.fields.community.error');
    haveErrors = true;
  }

  if (user?.training !== '' && yearValidation(user.training)) {
    errors.training = t('user.fields.training.error');
    haveErrors = true;
  }

  if (user?.second !== '' && yearValidation(user.second)) {
    errors.second = t('user.fields.second.error');
    haveErrors = true;
  }

  if (user?.introductionDate !== '' && yearValidation(user.introductionDate)) {
    errors.introductionDate = t('user.fields.introduction.date.error');
    haveErrors = true;
  }

  if (user?.firstActivity !== '' && yearValidation(user.firstActivity)) {
    errors.introductionDate = t('user.fields.firstActivity.error');
    haveErrors = true;
  }

  if (user?.surveyDate !== '' && yearValidation(user.surveyDate)) {
    errors.surveyDate = t('user.fields.survey.date.error');
    haveErrors = true;
  }

  if (user?.socialInfo) {
    const isOk = Array.from(user.socialInfo).filter((social) => !social.name);

    if (isOk.length > 0) {
      errors.socialInfo = t('user.fields.social.error');
      haveErrors = true;
    }
  }

  if (user?.cards) {
    const validation = user.cards.map?.((card) => {
      const values = Object.values(card);
      return values.includes('');
    });

    if (validation.includes(true)) {
      errors.cards = t('user.fields.cards.error');
      haveErrors = true;
    }
  }

  setError(errors);

  return haveErrors;
};

export default validateTotalUser;
