import homeHandler from 'helpers/users';

const oldAndNewestActivities = (activities) => {
  //activities sort by date
  const activitiesArraySort = activities.sort((activity1, activity2) =>
    homeHandler.sortList(activity1, activity2, 'date'),
  );

  //date of the old activity
  const oldActivity = activitiesArraySort[0].date;
  const newestActivity =
    activitiesArraySort[activitiesArraySort.length - 1].date;

  return { oldActivity, newestActivity };
};

const addDays = (date, days) => {
  let newDate = new Date(date);

  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

const addDaysFormat = (date, days) => {
  let newDate = new Date(date);

  newDate.setDate(newDate.getDate() + days);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  const monthFormating = month.toString().length > 1 ? month : '0' + month;
  const dayFormating = day.toLocaleString().length > 1 ? day : '0' + day;

  return year + '-' + monthFormating + '-' + dayFormating;
};

const subtractDaysFormat = (date, days) => {
  let newDate = new Date(date);

  newDate.setDate(newDate.getDate() - days);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  const monthFormating = month.toString().length > 1 ? month : '0' + month;
  const dayFormating = day.toLocaleString().length > 1 ? day : '0' + day;

  return year + '-' + monthFormating + '-' + dayFormating;
};

const convertAndRemoveYear = (string) => {
  const array = string.split('-').reverse();
  array.pop();

  return array.join('-');
};

const calendarToShow = (activities, t) => {
  const dates = [];
  const { oldActivity, newestActivity } = oldAndNewestActivities(activities);

  let currentDate = new Date(oldActivity);
  const endDate = new Date(newestActivity);

  while (currentDate <= endDate) {
    if (currentDate.getDay() > 0) {
      //convert the current day for the sunday of that week
      currentDate.setDate(currentDate.getDate() - currentDate.getDay());
    }
    const first = addDaysFormat(currentDate, 0);
    dates.push({
      key: first,
      label: `${t('dates.week.sunday')} ${convertAndRemoveYear(first)}`,
      filter: false,
    });

    const second = addDaysFormat(currentDate, 1);
    dates.push({
      key: second,
      label: `${t('dates.week.monday')} ${convertAndRemoveYear(second)}`,
      filter: false,
    });

    const third = addDaysFormat(currentDate, 2);
    dates.push({
      key: third,
      label: `${t('dates.week.tuesday')} ${convertAndRemoveYear(third)}`,
      filter: false,
    });

    const fourth = addDaysFormat(currentDate, 3);
    dates.push({
      key: fourth,
      label: `${t('dates.week.wednesday')} ${convertAndRemoveYear(fourth)}`,
      filter: false,
    });

    const fifth = addDaysFormat(currentDate, 4);
    dates.push({
      key: fifth,
      label: `${t('dates.week.thursday')} ${convertAndRemoveYear(fifth)}`,
      filter: false,
    });

    const sixth = addDaysFormat(currentDate, 5);
    dates.push({
      key: sixth,
      label: `${t('dates.week.friday')} ${convertAndRemoveYear(sixth)}`,
      filter: false,
    });

    const seventh = addDaysFormat(currentDate, 6);
    dates.push({
      key: seventh,
      label: `${t('dates.week.saturday')} ${convertAndRemoveYear(seventh)}`,
      filter: false,
    });

    currentDate = addDays(currentDate, 7);
  }

  return dates;
};

export default calendarToShow;

export { addDaysFormat, subtractDaysFormat };
