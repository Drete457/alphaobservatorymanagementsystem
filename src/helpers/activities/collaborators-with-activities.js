const collaboratorsWithActivities = (list) => {
  const newUserWithActivities = [];

  if (list.length > 0) {
    list.forEach?.((user) => {
      if (user.numberOfActivities !== 0) {
        newUserWithActivities.push(user);
      }
    });
  }

  return newUserWithActivities;
};

export default collaboratorsWithActivities;
