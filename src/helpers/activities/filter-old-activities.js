const filterOlderActivities = (activities) => {
  const actitiesNotToShow = [
    'b6fddec71394-0fc4f603-af3b986f-026fa186-b0f57c47439ac15c',
    'a3f33467f9e2-9f5f41d1-ade45059-670a07fe-1081efe10b3934be',
  ];
  const newArray = activities.filter(
    (activity) => !actitiesNotToShow.includes(activity.id),
  );

  return newArray;
};

export default filterOlderActivities;
