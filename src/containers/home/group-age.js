import { groupAge as groupAgeList } from '../../assets/generic/generic-information.json';

const groupChoose = (age) => {
  let text = '';

  if (age >= 60) {
    text = groupAgeList[7];
  } else if (age > 54) {
    text = groupAgeList[6];
  } else if (age > 48) {
    text = groupAgeList[5];
  } else if (age > 42) {
    text = groupAgeList[4];
  } else if (age > 36) {
    text = groupAgeList[3];
  } else if (age > 30) {
    text = groupAgeList[2];
  } else if (age > 24) {
    text = groupAgeList[1];
  } else if (age > 15) {
    text = groupAgeList[0];
  } else {
    text = 'Invalid birth year';
  }

  return text;
};

const groupAge = (user) => {
  const currentYear = new Date().getFullYear();
  const userAge = currentYear - user.birthyear;

  return groupChoose(userAge);
};

export default groupAge;
