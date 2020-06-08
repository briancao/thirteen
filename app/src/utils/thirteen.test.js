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
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  var single = thirteen.identifyPairs(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'three');
  var three = thirteen.identifyPairs(deck);

  expect(three.length).toBe(1);
  expect(three[0].type).toBe('pair');
  expect(three[0].value).toBe(3);

  //multiple pairs
  deck = newDeck.filter((c) => c.name === 'three' || c.name === 'four');
  var threefour = thirteen.identifyPairs(deck);

  expect(threefour.length).toBe(2);
  expect(threefour[0].type).toBe('pair');
  expect(threefour[0].value).toBe(3);
  expect(threefour[1].type).toBe('pair');
  expect(threefour[1].value).toBe(4);
});

test('Identify Unique Pairs', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  var single = thirteen.identifyPairsAll(deck);

  expect(single.length).toBe(0);

  //all pairs of three
  deck = newDeck.filter((c) => c.name === 'three');
  var three = thirteen.identifyPairsAll(deck);

  expect(three.length).toBe(1);
  expect(three[0].sets.length).toBe(6);
  expect(three[0].type).toBe('pair');
  expect(three[0].value).toBe(3);

  //all pairs of three, no spaid
  deck = newDeck.filter((c) => c.name === 'three' && c.suit != 'spade');
  var three = thirteen.identifyPairsAll(deck);

  expect(three.length).toBe(1);
  expect(three[0].sets.length).toBe(3);
  expect(three[0].type).toBe('pair');
  expect(three[0].value).toBe(3);

  //multiple pairs
  deck = newDeck.filter((c) => c.name === 'three' || c.name === 'four');
  var threefour = thirteen.identifyPairsAll(deck);

  expect(threefour.length).toBe(2);
  expect(threefour[0].sets.length).toBe(6);
  expect(threefour[0].type).toBe('pair');
  expect(threefour[0].value).toBe(3);
  expect(threefour[1].sets.length).toBe(6);
  expect(threefour[1].type).toBe('pair');
  expect(threefour[1].value).toBe(4);
});

test('Identify Triples', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  var single = thirteen.identifyTriples(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 2);
  var three = thirteen.identifyTriples(deck);

  expect(three.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 3);
  var three = thirteen.identifyTriples(deck);

  expect(three.length).toBe(1);
  expect(three[0].type).toBe('triple');
  expect(three[0].value).toBe(3);

  //full three's
  deck = newDeck.filter((c) => c.name === 'three');
  var three = thirteen.identifyTriples(deck);

  expect(three.length).toBe(1);
  expect(three[0].type).toBe('triple');
  expect(three[0].value).toBe(3);

  //full three's four's
  deck = newDeck.filter((c) => c.name === 'three' || c.name === 'four');
  var three = thirteen.identifyTriples(deck);

  expect(three.length).toBe(2);
  expect(three[0].type).toBe('triple');
  expect(three[0].value).toBe(3);
  expect(three[1].type).toBe('triple');
  expect(three[1].value).toBe(4);

  //full three's, partial four's
  deck = newDeck.filter((c) => c.name === 'three' || (c.name === 'four' && c.suitValue < 3));
  var three = thirteen.identifyTriples(deck);

  expect(three.length).toBe(2);
  expect(three[0].type).toBe('triple');
  expect(three[0].value).toBe(3);
  expect(three[1].type).toBe('triple');
  expect(three[1].value).toBe(4);
});

test('Identify Unique Triples', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  var single = thirteen.identifyTriplesAll(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 2);
  var three = thirteen.identifyTriplesAll(deck);

  expect(three.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 3);
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].sets.length).toBe(1);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].value).toBe(3);

  //single triple from quad
  deck = newDeck.filter((c) => c.name === 'three');
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].sets.length).toBe(4);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].value).toBe(3);

  //full three's four's
  deck = newDeck.filter((c) => c.name === 'three' || c.name === 'four');
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(2);
  expect(triple[0].sets.length).toBe(4);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].value).toBe(3);
  expect(triple[1].sets.length).toBe(4);
  expect(triple[1].type).toBe('triple');
  expect(triple[1].value).toBe(4);

  //full three's, partial four's
  deck = newDeck.filter((c) => c.name === 'three' || (c.name === 'four' && c.suitValue < 3));
  var triple = thirteen.identifyTriplesAll(deck);

  expect(triple.length).toBe(2);
  expect(triple[0].sets.length).toBe(4);
  expect(triple[0].type).toBe('triple');
  expect(triple[0].value).toBe(3);
  expect(triple[1].sets.length).toBe(1);
  expect(triple[1].type).toBe('triple');
  expect(triple[1].value).toBe(4);
});

test('Identify Quads', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  var single = thirteen.identifyQuads(deck);

  expect(single.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 2);
  var three = thirteen.identifyQuads(deck);

  expect(three.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 3);
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(0);

  //single quad
  deck = newDeck.filter((c) => c.name === 'three');
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].value).toBe(3);

  //single  from quad
  deck = newDeck.filter((c) => c.name === 'three');
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].value).toBe(3);

  //full three's four's
  deck = newDeck.filter((c) => c.name === 'three' || c.name === 'four');
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(2);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].value).toBe(3);
  expect(triple[1].type).toBe('quad');
  expect(triple[1].value).toBe(4);

  //full three's, partial four's
  deck = newDeck.filter((c) => c.name === 'three' || (c.name === 'four' && c.suitValue < 3));
  var triple = thirteen.identifyQuads(deck);

  expect(triple.length).toBe(1);
  expect(triple[0].type).toBe('quad');
  expect(triple[0].value).toBe(3);
});

test('Identify Straights', () => {
  let newDeck = deckHelper.createDeck(1, false, true);

  //single card
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  let set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 2);
  set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 3);
  set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //single quad
  deck = newDeck.filter((c) => c.name === 'three');
  set = thirteen.identifyStraights(deck);

  expect(set.length).toBe(0);

  //full deck, find straights of four
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
  let deck = newDeck.filter((c) => c.name === 'three' && c.suit === 'spade');
  let set = thirteen.identifyBombs(deck);

  expect(set.length).toBe(0);

  //single pair
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 2);
  set = thirteen.identifyBombs(deck);

  expect(set.length).toBe(0);

  //single triple
  deck = newDeck.filter((c) => c.name === 'three' && c.suitValue < 3);
  set = thirteen.identifyBombs(deck);

  expect(set.length).toBe(0);

  //single quad
  deck = newDeck.filter((c) => c.name === 'three');
  set = thirteen.identifyBombs(deck);

  expect(set.length).toBe(0);

  //full deck, find bombs of 3 pairs
  set = thirteen.identifyBombs(newDeck, 3);

  set.forEach((a) => expect(a.length).toBe(3));
  expect(set.length).toBe(10);

  //full deck, find bombs of 3 pairs
  set = thirteen.identifyBombs(newDeck, 3);

  set.forEach((a) => expect(a.length).toBe(3));
  expect(set.length).toBe(10);
});