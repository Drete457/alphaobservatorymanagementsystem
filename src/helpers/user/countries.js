import { countries as countriesList } from '../../assets/generic/generic-information.json';

const countries = () => {
  const filterCountriesList = Array.from(countriesList).map(
    (value) => value.country,
  );

  return filterCountriesList;
};

export default countries;
