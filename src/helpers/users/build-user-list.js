import homeHandler from '.';
import userHandler from 'helpers/user';
import sortList from './sort-list';

const buildUserList = (
  data,
  countriesList,
  genericList,
  setListUsers,
  setUsers,
  setUsersWithFollowers,
  setLogs,
) => {
  const logsArray = [];
  const arrayData = Object.values(data);
  const sortedList = arrayData.sort((user1, user2) =>
    sortList(user1, user2, 'name'),
  );

  const usersList = homeHandler.buildUsersListFilter(data);
  const usersListSort = usersList.sort((user1, user2) =>
    sortList(user1, user2, 'name'),
  );
  usersListSort.unshift({ id: '1', name: 'None' });

  const fillArrayData = sortedList?.map((user) => {
    if (user.followed) {
      const followedBy = usersListSort.find(
        (value) => value.id === user.followed,
      )?.name;

      user.followed = followedBy;
    }

    if (user.country) {
      const countryName = countriesList.find(
        (country) => country.id === user.country,
      );

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

    if (user.personality) {
      const personalityName = genericList?.personality.find(
        (value) => value.id === user.personality,
      )?.name;

      user.personality = personalityName;
    }

    if (user.introductionOption) {
      const introductionOption = genericList?.options.find(
        (value) => value.id === user.introductionOption,
      )?.name;

      user.introductionOption = introductionOption;
    }

    user.cardsInfo = '';
    if (user.cards) {
      const cardsNamesArray = user.cards.map((card) => {
        const cardInfo = genericList?.cardTypes.find(
          (value) => value.id === card.id,
        );

        return cardInfo?.name;
      });

      user.cardsInfo = cardsNamesArray.join(', ');

      delete user.cards;
    }

    if (user?.cardsPosition) {
      delete user.cardsPosition;
    }

    if (user.contacted) {
      let contactBy = usersList.find(
        (value) => value.id === user.contacted,
      )?.name;

      if (contactBy === 'None') {
        contactBy = 'Training';
      }

      user.contacted = contactBy;
    }

    if (user.gender) {
      const profileName = genericList?.gender.find(
        (value) => value.id === user.gender,
      )?.name;

      user.gender = profileName;
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

    if (user?.lastModification) {
      user.lastModification.forEach((log) =>
        logsArray.push({ ...log, name: user.name }),
      );
    }

    return user;
  });

  if (usersList.length > 0) {
    setListUsers(usersList);
  }

  setUsers(fillArrayData);
  setUsersWithFollowers(fillArrayData);
  setLogs(logsArray);
};

export default buildUserList;
