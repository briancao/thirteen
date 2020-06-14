const suits = ['spade', 'club', 'diamond', 'heart'];
const names = [
  { name: 'two', value: 2 },
  { name: 'three', value: 3 },
  { name: 'four', value: 4 },
  { name: 'five', value: 5 },
  { name: 'six', value: 6 },
  { name: 'seven', value: 7 },
  { name: 'eight', value: 8 },
  { name: 'nine', value: 9 },
  { name: 'ten', value: 10 },
  { name: 'jack', value: 11 },
  { name: 'queen', value: 12 },
  { name: 'king', value: 13 },
  { name: 'ace', value: 14 },
];

const createDeck = (quantity = 1, acelow = false, twohigh = false) => {
  const deck = names.reduce((acc, cv) => {
    return [
      ...acc,
      ...suits.map((s, i) => {
        if (acelow && cv.name === 'ace') {
          return { ...cv, suit: s, suitValue: i, value: 1 };
        } else if (twohigh && cv.name === 'two') {
          return { ...cv, suit: s, suitValue: i, value: 15};
        } else {
          return { ...cv, suit: s, suitValue: i };
        }
      }),
    ];
  }, []);

  if (quantity === 1) {
    return deck;
  } else {
    let counter = 1;
    let multiDeck = [...deck];
    while (counter < quantity) {
      counter += 1;
      multiDeck = [...multiDeck, ...deck];
    }

    return multiDeck;
  }
};

const dealCard = (deck) => {
  let i = Math.floor(Math.random() * deck.length);
  let card = deck[i];
  deck.splice(i, 1);
  return card;
};

const shuffleDeck = (deck) => {
  const d = [...deck];

  return deck.reduce((acc, cv) => {
    acc = [...acc, dealCard(d)];

    return acc;
  }, []);
};

const sortCards = (cards) => {
  return cards.sort((c1, c2) => {
    if (c1.value < c2.value) {
      return -1;
    }
    if (c1.value > c2.value) {
      return 1;
    }
    if (c1.suitValue < c2.suitValue) {
      return -1;
    }
    if (c1.suitValue > c2.suitValue) {
      return 1;
    }
    return 0;
  });
};

const createShuffledDeck = (quantity = 1, acelow = false, twohigh = false) => {
  return shuffleDeck(createDeck(quantity, acelow, twohigh));
};

export { createDeck, shuffleDeck, createShuffledDeck, dealCard, sortCards };
