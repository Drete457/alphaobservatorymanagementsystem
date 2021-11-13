const contactByFilter = (userList) => {
  const newArray = userList?.map?.((user) => {
    const newUser = { ...user };

    if (newUser.id === '1') {
      newUser.name = 'Training';
    }

    return newUser;
  });

  return newArray;
};

export default contactByFilter;
