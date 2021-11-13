import userHandler from 'helpers/user';
import homeHandler from 'helpers/users';

const buildEntryList = (
  data,
  countriesList,
  genericList,
  usersList,
  setEntry,
) => {
  const arrayData = Object.values(data);
  const sortedList = arrayData.sort((user1, user2) =>
    homeHandler.sortList(user1, user2, 'name'),
  );

  const fillArrayData = sortedList?.map((userInfo) => {
    const user = { ...userInfo };

    if (user.contacted) {
      let contactBy = usersList.find(
        (value) => value.id === user.contacted,
      )?.name;

      if (contactBy === 'None') {
        contactBy = 'Training';
      }

      user.contacted = contactBy;
    }

    user.timezone = '';
    if (user.country) {
      const countryName = countriesList.find(
        (country) => country.id === user.country,
      );

      user.timezone = countryName?.timezone;
      user.country = userHandler.countryNameAndGmt(countryName);
    }

    if (user?.social && user?.socialInfo) {
      const contactList = user.social.map((userSocial) => {
        const socialName = genericList?.socialmedia.find(
          (social) => social.id === userSocial,
        );

        return socialName?.name;
      });

      if (contactList.includes('Whatsapp')) {
        const position = contactList.indexOf('Whatsapp');
        const number = user.socialInfo[position]?.name;

        user.socialInfo = `Whatsapp: ${number}`;
      } else {
        user.socialInfo = `${contactList[0]}: ${user.socialInfo[0]?.name}`;
      }
    }

    if (user.birthyear) {
      const year = genericList?.years.find(
        (year) => year.id === user.birthyear,
      );

      user.birthyear = year.name;
      user.groupAge = homeHandler.groupAge(year.name, genericList?.groupAge);
    } else {
      user.groupAge = '';
    }

    if (user.employment) {
      const employmentName = genericList?.ocupation.find(
        (value) => value.id === user.employment,
      )?.name;

      user.employment = employmentName;
    }

    if (user.gender) {
      const profileName = genericList?.gender.find(
        (value) => value.id === user.gender,
      )?.name;

      user.gender = profileName;
    }

    if (user.personality) {
      const personalityName = genericList?.personality.find(
        (value) => value.id === user.personality,
      )?.name;

      user.personality = personalityName;
    }

    return user;
  });

  setEntry(fillArrayData);
};

export default buildEntryList;
