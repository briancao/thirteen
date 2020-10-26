export const WS_CONNECT = 'WS_CONNECT';
export const WS_CONNECTED = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_DISCONNECTED = 'WS_DISCONNECT';
export const WS_JOIN_QUICK_GAME = 'WS_JOIN_QUICK_GAME';
export const WS_CREATE_ROOM = 'WS_CREATE_ROOM';
export const WS_JOIN_ROOM = 'WS_JOIN_ROOM';
export const WS_LEAVE_ROOM = 'WS_LEAVE_ROOM';
export const WS_SEARCH_ROOMS = 'WS_SEARCH_ROOMS';
export const WS_LIST_PLAYERS = 'WS_LIST_PLAYERS';

export const wsConnect = (connection) => ({ type: WS_CONNECT, data: { connection } });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });
export const wsCreateRoom = () => ({ type: WS_CREATE_ROOM });
export const wsJoinRoom = (roomName) => ({ type: WS_JOIN_ROOM, data: { roomName } });
export const wsLeaveRoom = (roomName) => ({ type: WS_LEAVE_ROOM, data: { roomName } });
export const wsSearchRooms = (search) => ({ type: WS_SEARCH_ROOMS, data: { search } });
export const wsListPlayers = (roomName) => ({ type: WS_LIST_PLAYERS, data: { roomName } });

export const UPDATE_CONNECTION_STATUS = 'SOCKET_UPDATE';

export function updateConnection(status) {
  return { type: UPDATE_CONNECTION_STATUS, data: status };
}
