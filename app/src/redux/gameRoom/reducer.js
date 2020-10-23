import * as actions from './actions';

const initialState = {
  roomName: null,
  players: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case actions.CREATE_ROOM:
      return { ...state, roomName: data };
    case actions.JOIN_ROOM:
      return { ...state, roomName: data };
    case actions.LEAVE_ROOM:
      return { ...state, roomName: null, players: [] };
    case actions.UPDATE_PLAYERS:
      return { ...state, players: data };
    default:
      return state;
  }
}
