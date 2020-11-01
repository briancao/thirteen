export const WS_CONNECT = 'WS_CONNECT';
export const WS_CONNECTED = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_DISCONNECTED = 'WS_DISCONNECT';
export const WS_JOIN_QUICK_GAME = 'WS_JOIN_QUICK_GAME';
export const WS_ROOM_CREATE = 'WS_ROOM_CREATE';
export const WS_ROOM_JOIN = 'WS_ROOM_JOIN';
export const WS_ROOM_LEAVE = 'WS_ROOM_LEAVE';
export const WS_ROOM_SEARCH = 'WS_ROOM_SEARCH';
export const WS_ROOM_LIST_PLAYERS = 'WS_ROOM_LIST_PLAYERS';

export const generateGameRoomName = (socket) => {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';

  for (var i = 0; i < 4; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  if (Object.keys(socket.rooms).some((a) => a == result)) {
    return generateGameRoom();
  }

  return result;
};