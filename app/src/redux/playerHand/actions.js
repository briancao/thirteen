import { removeCard } from '../../utils/deck';

export function updateCards(cards) {
  return { type: 'UPDATE_CARDS', data: cards };
}

export function updateSet(cards) {
  return { type: 'UPDATE_SET', data: cards };
}

export function addSet(card) {
  return (dispatch, getState) => {
    return dispatch({ type: 'UPDATE_SET', data: [...getState().playerHand.set, card] });
  };
}

export function removeSet(card) {
  return (dispatch, getState) => {
    return dispatch({ type: 'UPDATE_SET', data: removeCard(card, getState().playerHand.set) });
  };
}
