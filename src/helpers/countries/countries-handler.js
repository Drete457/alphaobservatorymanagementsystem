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

export { countryDelete, inputHandler };
