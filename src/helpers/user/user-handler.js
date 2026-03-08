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

const normalizeSocialSelection = (value) => {
  if (!value) {
    return [];
  }

  const selectedValues = Array.isArray(value) ? value : [value];

  return selectedValues
    .map((currentValue) => currentValue?.value)
    .filter(Boolean);
};

const buildSocialInfo = (socialList, currentSocialInfo = []) => {
  return socialList.map((social) => {
    const alreadyHave = Array.from(currentSocialInfo).find(
      (value) => value.id === social,
    );

    if (alreadyHave) {
      return alreadyHave;
    }

    return { id: social, name: '' };
  });
};

const userSocialSelectHandler = (key, value, setUser, user) => {
  const userSocial = normalizeSocialSelection(value);
  const userSocialInfo = buildSocialInfo(userSocial, user.socialInfo || []);

  setUser({
    ...user,
    [key]: userSocial,
    socialInfo: userSocialInfo,
  });
};

const userSocialInfoHandler = (key, event, setUser, user, index) => {
  const name = event.target.value;
  let socialInfoArray = Array.from(user.socialInfo || []);

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
