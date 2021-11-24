const baseAmbit = (newUser, alphaCafeArray, surveySessionArray, date) => {
  let alphaCafe = 0;
  let surveySession = 0;
  let wasChange = false;
  let value = newUser?.baseAmbit;

  alphaCafeArray.forEach((value) => {
    if (value.list.indexOf(newUser.id) !== -1) {
      alphaCafe++;
    }
  });

  surveySessionArray.forEach((value) => {
    if (value.list.indexOf(newUser.id) !== -1) {
      surveySession++;
    }
  });

  if (newUser?.baseAmbit === '') {
    if (alphaCafe >= 3 && surveySession >= 3) {
      value = date;
      wasChange = true;
    }
  } else {
    if (alphaCafe < 3 || surveySession < 3) {
      value = '';
      wasChange = true;
    }
  }

  return { wasChange, value };
};

export default baseAmbit;
