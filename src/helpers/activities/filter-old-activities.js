const filterOlderActivities = (activities) => {
  console.log(activities);
  const actitiesNotToShow = [
    'b6fddec71394-0fc4f603-af3b986f-026fa186-b0f57c47439ac15c',
    '68bfc3947dde-e0dd5abb-2a0ec68f-825f0c3e-620131ab5c2df458',
  ];
  const newArray = activities.filter(
    (activity) => !actitiesNotToShow.includes(activity.id),
  );

  return newArray;
};

export default filterOlderActivities;
