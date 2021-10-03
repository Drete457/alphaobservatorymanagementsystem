import exportFromJSON from 'export-from-json';

const download = (data) => {
  const fileName = 'alphaList';
  const exportType = 'xls';

  exportFromJSON({ data, fileName, exportType });
};

const exportToExcel = (data, generic) => {
  const newData = data.map((user) => {
    const newUser = { ...user };
    newUser.birthyear = generic.years.find(
      (value) => value.id === user.birthyear,
    )?.name;
    newUser.employment = generic.ocupation.find(
      (value) => value.id === user.employment,
    )?.name;
    newUser.gender = generic.gender.find(
      (value) => value.id === user.gender,
    )?.name;
    newUser.personality = generic.personality.find(
      (value) => value.id === user.personality,
    )?.name;
    newUser.socialInfo.forEach?.((value) => {
      const socialName = generic.socialmedia.find(
        (social) => social.id === value.id,
      )?.name;
      newUser[socialName] = value.name;
    });

    delete newUser.socialInfo;
    delete newUser.cardsPosition;
    delete newUser.cards;
    delete newUser.activities;
    delete newUser.social;
    delete newUser.id;

    return newUser;
  });

  download(newData);
};

export default exportToExcel;
