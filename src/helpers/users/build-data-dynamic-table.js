const buildDataDynamicTable = (data) => {
  const newArray = [];

  data.forEach?.((userInformation) => {
    const user = { ...userInformation };

    for (const key in user) {
      if (user[key] === '') {
        user[key] = ' ';
      }
    }

    newArray.push(user);
  });

  return newArray;
};

export default buildDataDynamicTable;
