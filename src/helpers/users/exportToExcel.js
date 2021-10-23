import exportFromJSON from 'export-from-json';

const download = (data) => {
  const fileName = 'Colaborators_List';
  const exportType = 'xls';

  exportFromJSON({ data, fileName, exportType });
};

const exportToExcel = (data, generic) => {
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
    newUser.Cards = user.cardsInfo;
    newUser.Base_Ambit = user.baseAmbit;
    newUser.Contacted = user.contact;
    newUser.Gender = user.gender;
    newUser.Group_Age = user.groupAge;
    newUser.Birthyear = user.birthyear;
    newUser.Employment = user.employment;
    newUser.IntroductionAlphaCafe = '';

    if ('introductionAlphaCafe' in user) {
      newUser.IntroductionAlphaCafe = user.introductionAlphaCafe;
    }

    newUser.CreateDate = user.createDate;
    newUser.CreateBy = user.createUser;

    return newUser;
  });

  download(newData);
};

export default exportToExcel;
