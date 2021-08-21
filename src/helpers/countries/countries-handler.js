const countryHandler = (setCountries, countries) => {
  setCountries([...countries]);
};

const inputHandler = (event, countries, setCountries, index) => {
  const key = event.target.getAttribute('name');
  const value = event.target.value;

  countries[index][key] = value;

  countryHandler(setCountries, countries);
};

const countryDelete = (index, countries, setCountries) => {
  const newCountriesArray = [];

  countries?.forEach((country, indexCountry) => {
    if (indexCountry !== index) {
      newCountriesArray.push(country);
    }
  });

  setCountries(newCountriesArray);
};

const wasModifiedVerification = (wasModified, data, countries) => {
  let result = false;

  if (wasModified) {
    for (let i = 0; i < data.length && countries.length; i++) {
      if (data[i].country !== countries[i].country) {
        result = true;
        break;
      }

      if (data[i].gmt !== countries[i].gmt) {
        result = true;
        break;
      }
    }
  }

  return result;
};

export { countryDelete, inputHandler, wasModifiedVerification };
