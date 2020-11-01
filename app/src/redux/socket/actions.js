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

export const WS_GAME_START = 'WS_GAME_START'

export const wsConnect = (connection) => ({ type: WS_CONNECT, data: { connection } });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });

export const wsRoomCreate = () => ({ type: WS_ROOM_CREATE });
export const wsRoomJoin = (roomName) => ({ type: WS_ROOM_JOIN, data: { roomName } });
export const wsRoomLeave = (roomName) => ({ type: WS_ROOM_LEAVE, data: { roomName } });
export const wsRoomSearch = (search) => ({ type: WS_ROOM_SEARCH, data: { search } });
export const wsRoomListPlayers = (roomName) => ({ type: WS_ROOM_LIST_PLAYERS, data: { roomName } });

export const wsGameStart = (roomName) => ({ type: WS_GAME_START, data: { roomName } });

export const UPDATE_CONNECTION_STATUS = 'SOCKET_UPDATE';

export function updateConnection(status) {
  return { type: UPDATE_CONNECTION_STATUS, data: status };
}
