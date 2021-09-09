const genericHandler = (setGeneric, genericList, type, newArray) => {
  setGeneric({
    ...genericList,
    [type]: newArray,
  });
};

const genericCreate = (setGeneric, genericList, type, create) => {
  const newArray = [...genericList[type]];

  create ? newArray.push({ id: '', name: '' }) : newArray.push(create);

  genericHandler(setGeneric, genericList, type, newArray);
};

const genericCancel = (setGeneric, genericList, type, oldList) => {
  genericHandler(setGeneric, genericList, type, oldList[type]);
};

const genericDelete = (setGeneric, genericList, type, index) => {
  const newArray = [];

  genericList[type].forEach?.((element, elemIndex) => {
    if (elemIndex !== index) {
      newArray.push(element);
    }
  });

  genericHandler(setGeneric, genericList, type, newArray);
};

const inputHandler = (setGeneric, genericList, type, index, event) => {
  const key = event.target.getAttribute('name');
  const value =
    type === 'cardTypes'
      ? event.target.value.toUpperCase()
      : event.target.value;

  const newArray = [...genericList[type]];

  newArray[index][key] = value;

  genericHandler(setGeneric, genericList, type, newArray);
};

const bodyHandler = (setGeneric, genericList, type, index, event) => {
  const key = event.target.getAttribute('name');
  const value = event.target.value;

  const newArray = [...genericList[type]];

  newArray[index][key] = value;

  genericHandler(setGeneric, genericList, type, newArray);
};

const selectHandler = (setGeneric, genericList, type, index, event) => {
  const key = 'body';
  const value = event.value;

  const newArray = [...genericList[type]];

  newArray[index][key] = value;

  genericHandler(setGeneric, genericList, type, newArray);
};

export {
  genericCreate,
  genericCancel,
  genericDelete,
  inputHandler,
  bodyHandler,
  selectHandler,
};
