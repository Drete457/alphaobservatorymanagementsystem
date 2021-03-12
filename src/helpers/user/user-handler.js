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

const userSocialInfoAdd = (userSocial, setUser, user) => {
  let userSocialInfo = Array.from(user.socialInfo);

  if (userSocial.length > user.socialInfo.length) {
    const social = userSocial[userSocial.length - 1];

    userSocialInfo.push({
      title: social,
      name: '',
    });
  } else {
    userSocialInfo = Array.from(userSocialInfo).filter((social) =>
      userSocial.includes(social.title),
    );
  }

  userHandler('socialInfo', userSocialInfo, setUser, user);
};

const userSocialSelectHandler = (key, value, setUser, user) => {
  const userSocial = value.map((value) => value.value);

  userHandler(key, userSocial, setUser, user);
  userSocialInfoAdd(userSocial, setUser, user);
};

const userSocialInfoHandler = (key, event, setUser, user, index) => {
  const name = event.target.getAttribute('name');
  const value = event.target.value;

  let socialInfoArray = Array.from(user.socialInfo);

  socialInfoArray[index] = {
    title: name,
    name: value,
  };

  userHandler(key, socialInfoArray, setUser, user);
};

export {
  userInputHandler,
  userSelectHandler,
  userSocialSelectHandler,
  userSocialInfoHandler,
};
