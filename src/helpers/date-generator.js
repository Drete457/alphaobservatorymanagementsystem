const dateGenerator = () => {
  let date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthFormating = month.toString().length > 1 ? month : '0' + month;
  const dayFormating = day.toLocaleString().length > 1 ? day : '0' + day;

  const newDate = year + '-' + monthFormating + '-' + dayFormating;

  return newDate;
};

export default dateGenerator;
