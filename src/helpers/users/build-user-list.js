import homeHandler from '.';
import userHandler from 'helpers/user';
import sortList from './sort-list';

const buildUserList = (
  data,
  countriesList,
  genericList,
  setListUsers,
  setUsers,
) => {
  const arrayData = Object.values(data);
  const sortedList = arrayData.sort((user1, user2) =>
    sortList(user1, user2, 'name'),
  );

  const userList = homeHandler.buildUsersListFilter(data);
  const userListSort = userList.sort((user1, user2) =>
    sortList(user1, user2, 'name'),
  );

  const fillArrayData = sortedList?.map((user) => {
    if (user.followed) {
      const followedBy = userListSort.find(
        (value) => value.id === user.followed,
      )?.name;

      user.followed = followedBy;
    }

    if (user.contacted) {
      const contactBy = userList.find(
        (value) => value.id === user.contacted,
      )?.name;

      user.contacted = contactBy;
    }

    if (user.country) {
      const countryName = countriesList.find(
        (country) => country.id === user.country,
      );

      user.country = userHandler.countryNameAndGmt(countryName);
    }

    if (user.birthyear) {
      const year = genericList?.years.find(
        (year) => year.id === user.birthyear,
      );
      user.groupAge = homeHandler.groupAge(year.name, genericList?.groupAge);
    } else {
      user.groupAge = '';
    }

    if (user.introductionOption) {
      const introductionOption = genericList?.options.find(
        (value) => value.id === user.introductionOption,
      )?.name;

      user.introductionOption = introductionOption;
    }

    //undefinied for each user on the table
    user.activities = '';

    return user;
  });

  if (userList.length > 0) {
    setListUsers(userList);
  }

  setUsers(fillArrayData);
};

export default buildUserList;
