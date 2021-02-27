import { countries as countriesList } from '../../assets/generic/generic-information.json';

const countries = () => {
  const filterCountriesList = Array.from(countriesList).map(
    (country) => country.country,
  );

  return filterCountriesList;
};

export default countries;
