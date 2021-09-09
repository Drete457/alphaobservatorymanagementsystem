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

const genericDelete = (index, countries, setCountries) => {};

export { genericCreate, genericCancel, genericDelete };
