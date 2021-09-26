const validateGeneric = (generic, setError, t) => {
  const errors = [];
  const template = {};
  let haveErrors = false;

  for (let attr in generic[0]) {
    template[attr] = '';
  }

  generic?.forEach((generic) => errors.push(template));

  if (!generic || !Array.isArray(generic)) {
    return true;
  }

  generic?.forEach((generic, index) => {
    if (generic?.name === '') {
      errors[index].name = t('generic.error');
      haveErrors = true;
    }
  });

  if (haveErrors) {
    setError(errors);

    return haveErrors;
  }

  return false;
};

export default validateGeneric;
