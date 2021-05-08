const buildUsersListFilter = (userList) => {
  const arrayData = Object.values(userList);
  const userListFilter = arrayData.map?.((user) => {
    return { id: user.id, name: user.name };
  });
  userListFilter.unshift({ id: '1', name: 'None' });

  return userListFilter;
};

export default buildUsersListFilter;
