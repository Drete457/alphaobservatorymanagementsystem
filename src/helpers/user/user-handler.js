const userHandler = (key, value, setUser, user) => {
  setUser({
    ...user,
    [key]: value,
  });
};

const userInputHandler = (event, setUser, user) => {
  const key = event.target.getAttribute('name');
  const value = event.target.value;

  userHandler(key, value, setUser, user);
};

const userSelectHandler = (key, value, setUser, user) => {
  const userSelect = value.value;

  userHandler(key, userSelect, setUser, user);
};

const userSocialSelectHandler = (key, value, setUser, user) => {
  const userSocial = value.map((value) => value.value);

  userHandler(key, userSocial, setUser, user);
};

export { userInputHandler, userSelectHandler, userSocialSelectHandler };
