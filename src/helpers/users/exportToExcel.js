import exportFromJSON from 'export-from-json';

const download = (data) => {
  const fileName = 'Collaborators_List';
  const exportType = 'xls';

  exportFromJSON({ data, fileName, exportType });
};

const exportToExcel = (data) => {
  const newData = data.map((user) => {
    const newUser = {};

    newUser.Name = user.name;
    newUser.Followed = user.followed;
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
