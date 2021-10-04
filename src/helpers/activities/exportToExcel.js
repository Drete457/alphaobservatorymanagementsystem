import exportFromJSON from 'export-from-json';
import getDayName from './get-day-name';

const download = (data) => {
  const fileName = 'Colaborators_Activity_List';
  const exportType = 'xls';

  exportFromJSON({ data, fileName, exportType });
};

const exportToExcel = (data, t) => {
  const newData = data.map((user) => {
    const newUser = {};
    const currentUser = { ...user };

    delete currentUser.id;

    newUser.Name = currentUser.name;
    delete currentUser.name;

    newUser.Followed = currentUser.followed;
    delete currentUser.followed;

    newUser.Number_Of_Activities = currentUser.numberOfActivities;
    delete currentUser.numberOfActivities;

    const ArrayKeyValue = Object.entries(currentUser);
    const ArrayKeyValueReverse = ArrayKeyValue.reverse();

    ArrayKeyValueReverse.forEach((array) => {
      const key = array[0];
      const value = array[1];

      const dateFormate = new Date(key);
      const dayNumber = dateFormate.getDay();
      const dayName = getDayName(dayNumber, t);

      const correctTheDateFormat = key.split('-').reverse();
      correctTheDateFormat.pop();

      newUser[`${dayName} ${correctTheDateFormat.join('-')}`] = value;
    });

    return newUser;
  });
  console.log(newData);
  download(newData);
};

export default exportToExcel;
