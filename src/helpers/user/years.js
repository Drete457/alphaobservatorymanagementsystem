import { years as yearsList } from '../../assets/generic/generic-information.json';

const years = () => {
  const filterYearList = Array.from(yearsList).map((value) => value.year);

  return filterYearList;
};

export default years;
