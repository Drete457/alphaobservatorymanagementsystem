const validName = (userName, usersList) => {
  const haveSameName = usersList.find(
    (value) =>
      value.name.toLowerCase().replace(/\s+/g, '') ===
      userName.toLowerCase?.().replace(/\s+/g, ''),
  );

  return haveSameName ? true : false;
};

export default validName;
