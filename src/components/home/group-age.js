const groupChoose = (age, groupAge) => {
  let index = 0;
  let text = '';

  if (age >= 60) {
    index = 7;
  } else if (age > 54) {
    index = 6;
  } else if (age > 48) {
    index = 5;
  } else if (age > 42) {
    index = 4;
  } else if (age > 36) {
    index = 3;
  } else if (age > 30) {
    index = 2;
  } else if (age > 24) {
    index = 1;
  } else if (age > 15) {
    index = 0;
  } else {
    index = 8;
  }

  text = groupAge[index]?.name;
  return text;
};

const groupAge = (year, groupAge) => {
  const currentYear = new Date().getFullYear();
  const userAge = currentYear - year;

  return groupChoose(userAge, groupAge);
};

export default groupAge;
