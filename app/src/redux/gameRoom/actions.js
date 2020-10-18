export const CREATE_ROOM = 'CREATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const LIST_ROOMS = 'LIST_ROOMS';

export function createRoom(roomName) {
  return { type: CREATE_ROOM, data: roomName };
}

export function joinRoom(roomName) {
  return { type: JOIN_ROOM, data: roomName };
}

export function listRooms(roomName) {
  return { type: LIST_ROOMS, data: roomName };
}
