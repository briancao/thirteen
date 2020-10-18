export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_JOIN_QUICK_GAME = 'WS_JOIN_QUICK_GAME';
export const WS_CREATE_ROOM = 'WS_CREATE_ROOM';
export const WS_JOIN_ROOM = 'WS_JOIN_ROOM';
export const WS_LIST_ROOMS = 'WS_LIST_ROOMS';

export const wsConnect = (connection) => ({ type: WS_CONNECT, connection });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });
export const wsCreateRoom = () => ({ type: WS_CREATE_ROOM });
export const wsJoinRoom = (roomName) => ({ type: WS_JOIN_ROOM, roomName });
export const wsListRooms = (rooms) => ({ type: WS_LIST_ROOMS, rooms });
