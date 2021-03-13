const uniqueId = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  //return id of format 'xxxxxxxxxxxx'-'xxxxxxxx'-'xxxxxxxx'-'xxxxxxxx'-'xxxxxxxxxxxxxxxx'
  return (
    s4() +
    s4() +
    s4() +
    '-' +
    s4() +
    s4() +
    '-' +
    s4() +
    s4() +
    '-' +
    s4() +
    s4() +
    '-' +
    s4() +
    s4() +
    s4() +
    s4()
  );
};

export default uniqueId;
