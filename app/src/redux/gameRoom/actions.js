import { setJoinError } from '../gameBrowser/actions.js';

export const CREATE_ROOM = 'CREATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export function createRoom(roomName) {
  return { type: CREATE_ROOM, data: roomName };
}

export function joinRoom({ roomName, error }) {
  return (dispatch) => {
    if (error) {
      dispatch(setJoinError(error));
      return dispatch({ type: LEAVE_ROOM, data: roomName });
    }

    return dispatch({ type: JOIN_ROOM, data: roomName });
  };
}

export function leaveRoom(roomName) {
  return { type: LEAVE_ROOM, data: roomName };
}

export function updatePlayers(players) {
  return { type: UPDATE_PLAYERS, data: players };
}
