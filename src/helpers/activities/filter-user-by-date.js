const filterUserByDate = (user, beginDate, endDate) => {
  const userFieldsInArray = Object.keys(user);
  const beginDateNewDate = new Date(beginDate);
  const endDateNewDate = new Date(endDate);

  const newUserFields = userFieldsInArray.filter((field) => {
    const fieldDate = new Date(field);

    if (
      isNaN(fieldDate) ||
      (fieldDate >= beginDateNewDate && fieldDate <= endDateNewDate)
    ) {
      return true;
    }

    return false;
  });

  return newUserFields;
};

export default filterUserByDate;
