const getDayName = (dayNumber, t) => {
  switch (dayNumber) {
    case 1:
      return t('dates.week.monday');

    case 2:
      return t('dates.week.tuesday');

    case 3:
      return t('dates.week.wednesday');

    case 4:
      return t('dates.week.thursday');

    case 5:
      return t('dates.week.friday');

    case 6:
      return t('dates.week.saturday');

    default:
      return t('dates.week.sunday');
  }
};

export default getDayName;
