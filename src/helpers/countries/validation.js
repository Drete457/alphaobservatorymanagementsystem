const validateCountries = (countries, setErrorCountries, t) => {
  const errors = [];
  countries?.forEach(() => errors.push({ country: '', gmt: '' }));

  let haveErrors = false;
  const gmtRegex = /[+−±-][0-9]{2}:[0-9]{2}\b/;

  if (!countries || !Array.isArray(countries)) {
    return true;
  }

  countries?.forEach((country, index) => {
    if (country?.country === '') {
      errors[index].country = t('countries.country.error');
      haveErrors = true;
    }

    if (country?.gmt === '' || !gmtRegex.test(country?.gmt)) {
      errors[index].gmt = t('countries.gmt.error');
      haveErrors = true;
    }
  });

  if (haveErrors) {
    setErrorCountries(errors);

    return haveErrors;
  }
};

export default validateCountries;
