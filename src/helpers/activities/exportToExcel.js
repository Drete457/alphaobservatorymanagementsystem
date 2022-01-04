import exportFromJSON from 'export-from-json';
import getDayName from './get-day-name';

const download = (data) => {
  const fileName = 'Collaborators_Activity_List';
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
    newUser.Survey_Session = currentUser.numberSurveyActivities;
    newUser.Alpha_Cafe = currentUser.numberAlphaActivities;
    newUser.Direct_Communication = currentUser.numberDirectCommunication;

    delete currentUser.id;
    delete currentUser.name;
    delete currentUser.followed;
    delete currentUser.numberOfActivities;
    delete currentUser.numberSurveyActivities;
    delete currentUser.numberAlphaActivities;
    delete currentUser.numberDirectCommunication;
    delete currentUser.country;
    delete currentUser.socialInfo;
    delete currentUser.firstActivity;
    delete currentUser.training;
    delete currentUser.personality;
    delete currentUser.second;
    delete currentUser.introductionOption;
    delete currentUser.reservation;
    delete currentUser.introductionDate;
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
    newUser.Reservation_Date = user.reservation;
    newUser.Introdution_Date = user.introductionDate;
    newUser.Cards = user.cardsInfo;
    newUser.Base_Ambit = user.baseAmbit;
    newUser.Contacted = user.contacted;
    newUser.Gender = user.gender;
    newUser.Group_Age = user.groupAge;
    newUser.Birthyear = user.birthyear;
    newUser.Employment = user.employment;
    newUser.InvitationAlphaCafe = '';

    if ('invitationAlphaCafe' in user) {
      newUser.InvitationAlphaCafe = user.invitationAlphaCafe;
    }

    newUser.SurveyType = user?.typeSurvey;
    newUser.CreateDate = user.createDate;
    newUser.CreateBy = user.createUser;

    return newUser;
  });

  download(newData);
};

export default exportToExcel;
