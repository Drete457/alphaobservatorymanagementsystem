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

    newUser.Name = currentUser.name;
    newUser.Followed = currentUser.followed;
    newUser.Number_Of_Activities = currentUser.numberOfActivities;

    delete currentUser.id;
    delete currentUser.name;
    delete currentUser.followed;
    delete currentUser.numberOfActivities;
    delete currentUser.country;
    delete currentUser.socialInfo;
    delete currentUser.firstActivity;
    delete currentUser.training;
    delete currentUser.personality;
    delete currentUser.second;
    delete currentUser.introductionOption;
    delete currentUser.cardsInfo;
    delete currentUser.baseAmbit;
    delete currentUser.contact;
    delete currentUser.gender;
    delete currentUser.groupAge;
    delete currentUser.birthyear;
    delete currentUser.employment;

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

    newUser.Country = user.country;
    newUser.Contact = user.socialInfo;
    newUser.First_Acitivity = user.firstActivity;
    newUser.Training = user.training;
    newUser.Personality = user.personality;
    newUser.Second_Survey = user.second;
    newUser.Suitable_Introductive_Meeting = user.introductionOption;
    newUser.Cards = user.cardsInfo;
    newUser.Base_Ambit = user.baseAmbit;
    newUser.Contacted = user.contact;
    newUser.Gender = user.gender;
    newUser.Group_Age = user.groupAge;
    newUser.Birthyear = user.birthyear;
    newUser.Employment = user.employment;
    newUser.CreateDate = user.createDate;
    newUser.CreateBy = user.createUser;

    return newUser;
  });

  download(newData);
};

export default exportToExcel;
