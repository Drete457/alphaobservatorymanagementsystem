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

export default yearValidation;
