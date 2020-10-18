const deckHelper = require('./deck');

let initPlayers = [
  { name: 'player 1', position: 0, user_id: 0, cards: [] },
  { name: 'player 2', position: 1, user_id: 1, cards: [] },
  { name: 'player 3', position: 2, user_id: 2, cards: [] },
  { name: 'player 4', position: 3, user_id: 3, cards: [] },
];

let playedCards = [];
let history = [];

const dealCards = (players = []) => {
  const dealtPlayers = [...players];
  const deck = deckHelper.createShuffledDeck(1, false, true);

  Array.from({ length: 13 }, (c, ci) => {
    dealtPlayers.forEach((p, pi) => {
      p.cards.push({ ...deck[ci + pi * 13], played: false });
    });
  });

  return dealtPlayers;
};

// clears decks
const resetPlayerDecks = (players) => {
  return players.map((p) => {
    return { ...p, cards: [] };
  });
};

// player has playable cards
const playerHasCards = (player) => {
  return player.cards.some((c) => !c.played);
};

const findStartingPlayer = (players) => {
  players.forEach((p) => {
    if (p.cards.some((c) => c.value === 3 && c.suit === 'spade')) {
      return p.position;
    }
  });
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

const identifySingle = (cards) => {
  return cards;
};

const identifyPairs = (cards) => {
  return [...new Set(cards.map((c) => c.value))].reduce((acc, card) => {
    if (cards.filter((c) => c.value === card).length > 1) {
      acc.push({
        type: 'pair',
        value: card,
      });
    }

    return acc;
  }, []);
};

const identifyPairsAll = (cards) => {
  return [...new Set(cards.map((c) => c.value))].reduce((acc, cur) => {
    const values = cards.filter((c) => c.value === cur);

    const sets = values.reduce((all, p, i) => {
      values.forEach((p2, i2) => {
        if (i < i2) {
          all.push([p, p2]);
        }
      });

      return all;
    }, []);

    if (sets.length > 0) {
      acc.push({
        type: 'pair',
        value: cur,
        sets,
      });
    }

    return acc;
  }, []);
};

const identifyTriples = (cards) => {
  return [...new Set(cards.map((c) => c.value))].reduce((acc, card) => {
    if (cards.filter((c) => c.value === card).length > 2) {
      acc.push({
        type: 'triple',
        value: card,
      });
    }

    return acc;
  }, []);
};

const identifyTriplesAll = (cards) => {
  return [...new Set(cards.map((c) => c.value))].reduce((acc, cur) => {
    const values = cards.filter((c) => c.value === cur);

    const sets = values.reduce((all, p, i) => {
      values.forEach((p2, i2) => {
        values.forEach((p3, i3) => {
          if (i < i2 && i2 < i3) {
            all.push([p, p2, p3]);
          }
        });
      });

      return all;
    }, []);

    if (sets.length > 0) {
      acc.push({
        type: 'triple',
        value: cur,
        sets,
      });
    }

    return acc;
  }, []);
};

const identifyQuads = (cards) => {
  return [...new Set(cards.map((c) => c.value))].reduce((acc, value) => {
    if (cards.filter((c) => c.value === value).length > 3) {
      acc.push({
        type: 'quad',
        value,
      });
    }

    return acc;
  }, []);
};

const identifyStraights = (cards, straightLength) => {
  return [...new Set(cards.map((c) => c.value))].reduce((acc, cur, i, arr) => {
    arr
      .filter((c) => c > cur)
      .reduce(
        (acc2, cur2, i2, arr2) => {
          if (
            cur2 != 15 && // exclude 2
            (cur2 === arr2[i2] || i2 === arr2.length - 1) && // next card is one higher in value by 1, or is last card
            acc2[acc2.length - 1] === cur2 - 1 // previous card is one lower
          ) {
            acc2 = [...acc2, cur2];
            if (
              (straightLength && acc2.length === straightLength) ||
              (!straightLength && acc2.length > 2)
            ) {
              acc.push(acc2);
            }
          }

          return acc2;
        },
        [cur],
      );

    return acc;
  }, []);
};

const identifyBombs = (cards, straightLength, setLength = 2) => {
  let cardSet = [];
  switch (setLength) {
    case 2:
      cardSet = identifyPairs(cards);
    case 3:
      cardSet = identifyTriples(cards);
    case 4:
      cardSet = identifyQuads(cards);
  }

  return cardSet
    .reduce((acc, cur, i, arr) => {
      arr
        .filter((c) => c.value > cur.value)
        .reduce(
          (acc2, cur2, i2, arr2) => {
            if (
              cur2.value != 15 && // exclude 2
              (cur2.value === arr2[i2].value || i2 === arr2.length - 1) && // next card is one higher in value by 1, or is last card
              acc2[acc2.length - 1].value === cur2.value - 1 // previous card is one lower
            ) {
              acc2 = [...acc2, cur2];
              if (
                (straightLength && acc2.length === straightLength) ||
                (!straightLength && acc2.length > 2)
              ) {
                acc.push(acc2);
              }
            }

            return acc2;
          },
          [cur],
        );

      return acc;
    }, [])
    .map((a) => a.map((b) => b.value));
};

const playRound = (turn) => {
  let roundTurn = turn;
  return roundTurn;
};

const game = (players) => {
  dealCards(players);
  let turn = findStartingPlayer(players);

  if (playedCards.length != 51) {
    turn = playRound(turn);
  }
};

module.exports = {
  dealCards,
  resetPlayerDecks,
  playerHasCards,
  findStartingPlayer,
  sortCards,
  playRound,
  game,
  identifySingle,
  identifyPairs,
  identifyPairsAll,
  identifyTriples,
  identifyTriplesAll,
  identifyQuads,
  identifyStraights,
  identifyBombs,
};
