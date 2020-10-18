//playerHand

const initialState = {
  activeHand: {
    cards: [],
    isValid: false,
  },
  isValid: false,
  cards: [],
  gameHistory: [],
  opponentHand: 0,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case 'UPDATE_CARDS':
      return { ...state, cards: data };
    case 'UPDATE_OPPONENT_HAND':
      return { ...state, opponentHand: data };
    case 'UPDATE_ACTIVE_HAND':
      return { ...state, activeHand: data };
    case 'UPDATE_GAME_HISTORY':
      return { ...state, gameHistory: data };
    default:
      return state;
  }
}
