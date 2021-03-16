const countryNameAndGmt = (country) => {
  return country ? country?.country + ' GMT ' + country?.gmt : '';
};

export default countryNameAndGmt;
