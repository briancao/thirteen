export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_JOIN_QUICK_GAME = 'WS_JOIN_QUICK_GAME';
export const WS_CREATE_ROOM = 'WS_CREATE_ROOM';
export const WS_JOIN_ROOM = 'WS_JOIN_ROOM';
export const WS_LIST_ROOMS = 'WS_LIST_ROOMS';

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