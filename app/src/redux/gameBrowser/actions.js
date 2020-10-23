export const SEARCH_ROOMS = 'SEARCH_ROOMS';
export const SET_JOIN_ERROR = 'SET_JOIN_ERROR';

export function searchRooms(roomName) {
  return { type: SEARCH_ROOMS, data: roomName };
}
export function setJoinError(error) {
  return { type: SET_JOIN_ERROR, data: error };
}
