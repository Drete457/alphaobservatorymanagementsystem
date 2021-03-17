import homeHandler from '.';
import userHandler from '../../helpers/user';

const buildUserList = (
  data,
  countriesList,
  genericList,
  setListUsers,
  setUsers,
) => {
  const arrayData = Object.values(data);
  let userList = arrayData.map((user) => {
    return { id: user.id, name: user.name };
  });
  userList.unshift({ id: 1, name: 'None' });

  const fillArrayData = arrayData.map((user) => {
    if (user.followed) {
      const followedBy = userList.find((value) => value.id === user.followed)
        ?.name;

      user.followed = followedBy;
    }

    if (user.contacted) {
      const contactBy = userList.find((value) => value.id === user.contacted)
        ?.name;

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

    //temporary solution for undefinied for each user on the table
    user.ambitEntry = '';
    user.activities = '';

    return user;
  });

  if (userList.length > 0) {
    setListUsers(userList);
  }

  setUsers(fillArrayData);
};

export default buildUserList;
