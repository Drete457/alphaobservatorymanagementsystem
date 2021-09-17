import sortList from './sort-list';

const mainTableSortList = (usersList) => {
  const arrayListFollowed = [];
  const arrayListNoneFollowed = [];

  usersList.forEach?.((element) => {
    if (element?.followed === 'None') {
      arrayListNoneFollowed.push(element);
    } else {
      arrayListFollowed.push(element);
    }
  });

  const arrayListFollowedSort = arrayListFollowed.sort((user1, user2) =>
    sortList(user1, user2, 'name'),
  );
  const arrayListNoneFollowedSort = arrayListNoneFollowed.sort((user1, user2) =>
    sortList(user1, user2, 'name'),
  );

  return [...arrayListFollowedSort, ...arrayListNoneFollowedSort];
};

export default mainTableSortList;
