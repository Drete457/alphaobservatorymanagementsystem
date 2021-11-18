const firstLetterUppercaseOnArray = (name) => {
  const array = name.split(' ');

  let newName = '';

  array.forEach((word, index) => {
    word.toLowerCase();

    let wordFirstWord = word[0].toUpperCase() + word.substring(1);

    if (index < array.length - 1) {
      wordFirstWord += ' ';
    }

    newName += wordFirstWord;
  });

  return newName;
};

export default firstLetterUppercaseOnArray;
