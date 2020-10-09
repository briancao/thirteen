import { removeCard, sortCards } from '../../utils/deck';

export const UPDATE_CARDS = 'UPDATE_CARDS';
export const UPDATE_OPPONENT_HAND = 'UPDATE_OPPONENT_HAND';
export const UPDATE_ACTIVE_HAND = 'UPDATE_ACTIVE_HAND';

export function updateCards(cards) {
  return { type: 'UPDATE_CARDS', data: cards };
}

export function updateOpponent(count) {
  return { type: 'UPDATE_OPPONENT_HAND', data: count };
}

export function updateActiveHand(cards) {
  return (dispatch) => dispatch({ type: 'UPDATE_ACTIVE_HAND', data: sortCards(cards) });
}

export function addActiveHand(card) {
  return (dispatch, getState) => {
    const activeHand = sortCards([...getState().playerHand.activeHand.cards, card]);

    dispatch({ type: 'WS_UPDATE_ACTIVE_HAND', data: activeHand.length });

    return dispatch({
      type: 'UPDATE_ACTIVE_HAND',
      data: { cards: activeHand, isValid: false },
    });
  };
}

export function removeActiveHand(card) {
  return (dispatch, getState) => {
    const activeHand = removeCard(card, getState().playerHand.activeHand.cards);

    dispatch({ type: 'WS_UPDATE_ACTIVE_HAND', data: activeHand.length });

    return dispatch({
      type: 'UPDATE_ACTIVE_HAND',
      data: { cards: activeHand, isValid: false },
    });
  };
}
