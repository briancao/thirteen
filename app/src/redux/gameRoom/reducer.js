import * as actions from './actions';

const initialState = {
  rooms: [],
  roomName: null,
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
    case actions.CREATE_ROOM:
      return { ...state, roomName: data };
    case actions.LIST_ROOMS:
      return { ...state, rooms: data}
    default:
      return state;
  }
}
