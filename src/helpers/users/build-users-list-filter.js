const buildUsersListFilter = (userList) => {
  const arrayData = Object.values(userList);
  const userListFilter = arrayData?.map((user) => {
    return { id: user.id, name: user.name };
  });

  return userListFilter;
};

export default buildUsersListFilter;
