const cardType = (cardsType) => {
  const newArray = [];

  cardsType.forEach((card) => {
    if (card.see) {
      newArray.push(card);
    }
  });

  return newArray;
};

export default cardType;
