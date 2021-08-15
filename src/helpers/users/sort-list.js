const sortList = (value1, value2, key) => {
  const obj1 = value1[key].toUpperCase();
  const obj2 = value2[key].toUpperCase();

  if (obj1 < obj2) {
    return -1;
  }

  if (obj1 > obj2) {
    return 1;
  }

  return 0;
};

export default sortList;
