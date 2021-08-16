const dateGenerator = () => {
  let date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthFormating =
    month.toString().length > 1 ? month + 1 : '0' + (month + 1);
  const dayFormating = day.toLocaleString().length > 1 ? day : '0' + day;

  const newDate = year + '-' + monthFormating + '-' + dayFormating;

  return newDate;
};

export default dateGenerator;
