const activityHandler = (key, value, setActivity, activity) => {
  setActivity({
    ...activity,
    [key]: value,
  });
};

const activityInputHandler = (event, setActivity, activity) => {
  const key = event.target.getAttribute('name');
  const value = event.target.value;

  activityHandler(key, value, setActivity, activity);
};

const activitySelectHandler = (key, value, setActivity, activity) => {
  const userSelect = value.value;

  activityHandler(key, userSelect, setActivity, activity);
};

const activityMultiSelectHandler = (key, value, setActivity, activity) => {
  const usersList = value.map?.((value) => value.value);

  activityHandler(key, usersList, setActivity, activity);
};

const activityMultiInputHandler = (
  event,
  setActivity,
  activity,
  index,
  participant,
) => {
  const key = event.target.getAttribute('name');
  const value = event.target.value;
  const objInfoList = {
    id: participant.id,
    value,
  };
  activity.listInfo[index] = objInfoList;

  if (!isNaN(value)) {
    activityHandler(key, activity.listInfo, setActivity, activity);
  }
};

export {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
};
