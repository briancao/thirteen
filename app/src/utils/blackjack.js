const { createDeck, shuffleDeck, createShuffledDeck, dealCard } = require('./deck');

const players = [
  { name: 'dealer', table_position: 0, user_id: 0, money: 10000 },
  { name: 'player 1', table_position: 1, user_id: 1, money: 200 },
  { name: 'player 2', table_position: 2, user_id: 2, money: 200 },
  { name: 'player 3', table_position: 3, user_id: 3, money: 200 },
];

const table = {
  table_id: 1,
  status: 'open',
  rounds: [
    {
      round: 0,
      seed: 'dsfoiasdjfoi389',
      players: [
        {
          table_position: 0,
          user_id: 0,
          hand: [
            {
              bet: 5,
              cards: [
                { name: 'ten', value: 10, rank: 9, suite: 'heart', suiterank: 3 },
                { name: 'seven', value: 7, rank: 6, suite: 'spade', suiterank: 0 },
              ],
            },
          ],
        },
        {
          table_position: 1,
          user_id: 1,
          hand: [
            {
              bet: 5,
              cards: [
                { name: 'two', value: 2, rank: 1, suite: 'heart', suiterank: 3 },
                { name: 'six', value: 6, rank: 5, suite: 'diamond', suiterank: 2 },
              ],
            },
          ],
        },
        {
          table_position: 2,
          user_id: 2,
          hand: [
            {
              bet: 5,
              cards: [
                { name: 'king', value: 10, rank: 12, suite: 'diamond', suiterank: 2 },
                { name: 'six', value: 6, rank: 5, suite: 'clover', suiterank: 1 },
              ],
            },
          ],
        },
        {
          table_position: 3,
          user_id: 3,
          hand: [
            {
              bet: 5,
              cards: [
                { name: 'two', value: 2, rank: 1, suite: 'diamond', suiterank: 2 },
                { name: 'three', value: 3, rank: 2, suite: 'heart', suiterank: 3 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function play(id) {
  const players = { ...players };
  const table = {
    table_id: id,
    status: 'open',
    rounds: [],
  };

  while (games.status === 'open') {
    game(
      players.filter((p) => p.money > 0),
      table.rounds.length,
    );
  }
}

function game(players, roundNumber) {
  let deck = createShuffledDeck();
  let currentPlayers = players;

  let round = {
    round: roundNumber + 1,
    players: currentPlayers.sort((a, b) => (a.table_position > b.table_position ? 1 : -1)),
  };

  return round;
}

console.log(game(players, table.rounds.length));
