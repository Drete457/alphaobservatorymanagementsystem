import homeHandler from 'helpers/users';

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
  const userListSort = value.sort((user1, user2) =>
    homeHandler.sortList(user1, user2, 'label'),
  );

  const usersList = userListSort.map?.((value) => value.value);

  activityHandler(key, usersList, setActivity, activity);
};

const activityMultiInputHandler = (
  event,
  setActivity,
  activity,
  participant,
) => {
  const key = event.target.getAttribute('name');
  const value = event.target.value;
  const objInfoList = {
    id: participant.id,
    value,
  };

  const newActivityList = activity.listInfo.map?.((info) => {
    if (info.id === participant.id) {
      return objInfoList;
    }

    return info;
  });

  //search if the participant is already on the list
  const find = newActivityList.find?.((value) => value.id === participant.id);
  if (!find) {
    newActivityList.push(objInfoList);
  }

  activityHandler(key, newActivityList, setActivity, activity);
};

export {
  activityInputHandler,
  activitySelectHandler,
  activityMultiSelectHandler,
  activityMultiInputHandler,
};
