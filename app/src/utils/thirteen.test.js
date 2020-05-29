import * as thirteen from './thirteen';
import * as deckHelper from './deck';
import { hand } from './thirteen.test.data';

let initPlayers = [
  { name: 'player 1', position: 0, user_id: 0, cards: [] },
  { name: 'player 2', position: 1, user_id: 1, cards: [] },
  { name: 'player 3', position: 2, user_id: 2, cards: [] },
  { name: 'player 4', position: 3, user_id: 3, cards: [] },
];

test('Deals 13 cards to each player', () => {
  initPlayers = thirteen.dealCards(initPlayers);
  expect(initPlayers[0].cards.length).toBe(13);
  expect(initPlayers[1].cards.length).toBe(13);
  expect(initPlayers[2].cards.length).toBe(13);
  expect(initPlayers[3].cards.length).toBe(13);
});

test('Cards are sorted', () => {
  let ordered = true;
  initPlayers[0].cards = thirteen.sortCards(initPlayers[0].cards);

  initPlayers[0].cards.forEach((c, i) => {
    if (
      i != 12 &&
      c.value + c.suitValue / 10 >
        initPlayers[0].cards[i].value + initPlayers[0].cards[i].suitValue / 10
    ) {
      ordered = false;
    }
  });

  expect(ordered).toBe(true);
});

test('Identify Pairs', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'two' && c.suit === 'spade');
  var single = thirteen.identifyPairs(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'two');
  var two = thirteen.identifyPairs(deck);

  expect(two.length).toBe(1);
  expect(two[0].type).toBe('pair');
  expect(two[0].name).toBe('two');

  //multiple pairs
  deck = newDeck.filter((c) => c.name === 'two' || c.name === 'three');
  var twoThree = thirteen.identifyPairs(deck);

  expect(twoThree.length).toBe(2);
  expect(twoThree[0].type).toBe('pair');
  expect(twoThree[0].name).toBe('two');
  expect(twoThree[1].type).toBe('pair');
  expect(twoThree[1].name).toBe('three');
});

test('Identify Unique Pairs', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'two' && c.suit === 'spade');
  var single = thirteen.identifyPairsAll(deck);

  expect(single.length).toBe(0);

  //all pairs of two
  deck = newDeck.filter((c) => c.name === 'two');
  var two = thirteen.identifyPairsAll(deck);

  expect(two.length).toBe(1);
  expect(two[0].sets.length).toBe(6);
  expect(two[0].type).toBe('pair');
  expect(two[0].name).toBe('two');

  //all pairs of two, no spaid
  deck = newDeck.filter((c) => c.name === 'two' && c.suit != 'spade');
  var two = thirteen.identifyPairsAll(deck);

  expect(two.length).toBe(1);
  expect(two[0].sets.length).toBe(3);
  expect(two[0].type).toBe('pair');
  expect(two[0].name).toBe('two');

  //multiple pairs
  deck = newDeck.filter((c) => c.name === 'two' || c.name === 'three');
  var twoThree = thirteen.identifyPairsAll(deck);

  expect(twoThree.length).toBe(2);
  expect(twoThree[0].sets.length).toBe(6);
  expect(twoThree[0].type).toBe('pair');
  expect(twoThree[0].name).toBe('two');
  expect(twoThree[1].sets.length).toBe(6);
  expect(twoThree[1].type).toBe('pair');
  expect(twoThree[1].name).toBe('three');
});

test('Identify Triples', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'two' && c.suit === 'spade');
  var single = thirteen.identifyTriples(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 2);
  var two = thirteen.identifyTriples(deck);

  expect(two.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 3);
  var two = thirteen.identifyTriples(deck);

  expect(two.length).toBe(1);
  expect(two[0].type).toBe('triple');
  expect(two[0].name).toBe('two');

  //full two's
  deck = newDeck.filter((c) => c.name === 'two');
  var two = thirteen.identifyTriples(deck);

  expect(two.length).toBe(1);
  expect(two[0].type).toBe('triple');
  expect(two[0].name).toBe('two');

  //full two's three's
  deck = newDeck.filter((c) => c.name === 'two' || c.name === 'three');
  var two = thirteen.identifyTriples(deck);

  expect(two.length).toBe(2);
  expect(two[0].type).toBe('triple');
  expect(two[0].name).toBe('two');
  expect(two[1].type).toBe('triple');
  expect(two[1].name).toBe('three');

  //full two's, partial three's
  deck = newDeck.filter((c) => c.name === 'two' || (c.name === 'three' && c.suitValue < 3));
  var two = thirteen.identifyTriples(deck);

  expect(two.length).toBe(2);
  expect(two[0].type).toBe('triple');
  expect(two[0].name).toBe('two');
  expect(two[1].type).toBe('triple');
  expect(two[1].name).toBe('three');
});

test('Identify Unique Triples', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'two' && c.suit === 'spade');
  var single = thirteen.identifyTriplesAll(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 2);
  var two = thirteen.identifyTriplesAll(deck);

  expect(two.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 3);
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].sets.length).toBe(1);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].name).toBe('two');

  //single triple from quad
  deck = newDeck.filter((c) => c.name === 'two');
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].sets.length).toBe(4);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].name).toBe('two');

  //full two's three's
  deck = newDeck.filter((c) => c.name === 'two' || c.name === 'three');
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(2);
  expect(triple[0].sets.length).toBe(4);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].name).toBe('two');
  expect(triple[1].sets.length).toBe(4);
  expect(triple[1].type).toBe('triple');
  expect(triple[1].name).toBe('three');

  //full two's, partial three's
  deck = newDeck.filter((c) => c.name === 'two' || (c.name === 'three' && c.suitValue < 3));
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(2);
  expect(triple[0].sets.length).toBe(4);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].name).toBe('two');
  expect(triple[1].sets.length).toBe(1);
  expect(triple[1].type).toBe('triple');
  expect(triple[1].name).toBe('three');
});

test('Identify Quads', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'two' && c.suit === 'spade');
  var single = thirteen.identifyQuads(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 2);
  var two = thirteen.identifyQuads(deck);

  expect(two.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 3);
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'two');
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].name).toBe('two');

  //single  from quad
  deck = newDeck.filter((c) => c.name === 'two');
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].name).toBe('two');

  //full two's three's
  deck = newDeck.filter((c) => c.name === 'two' || c.name === 'three');
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(2);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].name).toBe('two');
  expect(triple[1].type).toBe('quad');
  expect(triple[1].name).toBe('three');

  //full two's, partial three's
  deck = newDeck.filter((c) => c.name === 'two' || (c.name === 'three' && c.suitValue < 3));
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].name).toBe('two');
});

test('Identify Straights', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'two' && c.suit === 'spade');
  let set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 2);
  set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'two' && c.suitValue < 3);
  set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //single quad
  deck = newDeck.filter((c) => c.name === 'two');
  set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //full deck, find straights of three
  set = thirteen.identifyStraights(newDeck, 3);

  set.forEach((a) => expect(a.length).toBe(3));
  expect(set.length).toBe(10);

  //missing every 3rd card
  set = thirteen.identifyStraights(
    newDeck.filter((a) => a.value !== 4 && a.value !== 7 && a.value !== 10 && a.value !== 13),
  );

  expect(set.length).toBe(0);

  //missing every 4th card
  set = thirteen.identifyStraights(
    newDeck.filter((a) => a.value !== 6 && a.value !== 10 && a.value !== 14),
  );

  set.forEach((a) => expect(a.length).toBe(3));
  expect(set.length).toBe(3);

  //missing every 5th card
  set = thirteen.identifyStraights(newDeck.filter((a) => a.value !== 7 && a.value !== 12));

  set.forEach((a) => {
    a.length === 3 ? expect(a.length).toBe(3) : expect(a.length).toBe(4);
  });
  expect(set.length).toBe(6);

  //full set, find 5
  deck = newDeck.filter((a) => a.suitValue === 0);
  set = thirteen.identifyStraights(deck, 5);

  set.forEach((a) => expect(a.length).toBe(5));
  expect(set.length).toBe(8);

  set = thirteen.identifyStraights(deck, 6);
 
  set.forEach((a) => expect(a.length).toBe(6));
  expect(set.length).toBe(7);

  set = thirteen.identifyStraights(deck, 12);
 
  set.forEach((a) => expect(a.length).toBe(12));
  expect(set.length).toBe(1);

  set = thirteen.identifyStraights(newDeck);

  expect(set.length).toBe(55);
});

test('Identify Bomb', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = [...newDeck];
  let set = thirteen.identifyBombs(deck);

  //console.log(set);
})