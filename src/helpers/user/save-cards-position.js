const updateCardsPosition = (layout, cardPositions) => {
  const newPosition = cardPositions['xl'].map((value, index) => {
    if (typeof layout[index] === 'object') {
      if (value.x === layout[index].x && value.y === layout[index].y) {
        return value;
      } else {
        const card = { ...value, x: layout[index].x, y: layout[index].y };

        return card;
      }
    }
    return value;
  });
  sessionStorage.setItem('cardsPosition', JSON.stringify({ xl: newPosition }));
};

export default updateCardsPosition;
