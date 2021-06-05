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
  console.log();
  userHandler(key, userSelect, setUser, user);
};

const userSocialInfoAdd = (setUser, user) => {
  let userSocialInfo = user.social.map?.((social) => {
    const alreadyHave = Array.from(user.socialInfo).find(
      (value) => value.id === social,
    );

    if (alreadyHave) {
      return alreadyHave;
    }

    return { id: social, name: '' };
  });

  userHandler('socialInfo', userSocialInfo, setUser, user);
};

const userSocialSelectHandler = (key, value, setUser, user) => {
  const userSocial = value.map?.((value) => value.value);

  userHandler(key, userSocial, setUser, user);

  user.social = userSocial;
  userSocialInfoAdd(setUser, user);
};

const userSocialInfoHandler = (key, event, setUser, user, index) => {
  const name = event.target.value;
  let socialInfoArray = Array.from(user.socialInfo);

  socialInfoArray[index] = {
    ...socialInfoArray[index],
    name,
  };

  userHandler(key, socialInfoArray, setUser, user);
};

export {
  userInputHandler,
  userSelectHandler,
  userSocialSelectHandler,
  userSocialInfoHandler,
};
