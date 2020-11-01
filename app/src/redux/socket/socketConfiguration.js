import {
  WS_CONNECTED,
  WS_DISCONNECTED,
  WS_ROOM_CREATE,
  WS_ROOM_LIST_PLAYERS,
  WS_ROOM_JOIN,
  WS_ROOM_LEAVE,
  WS_ROOM_SEARCH,
  updateConnection,
} from './actions';
import * as gameRoom from '../gameRoom/actions';
import * as gameBrowser from '../gameBrowser/actions';

export default function configureSocket(socket, store) {
  socket.on(WS_CONNECTED, () => store.dispatch(updateConnection(true)));
  socket.on(WS_DISCONNECTED, () => store.dispatch(updateConnection(false)));
  socket.on(WS_ROOM_CREATE, (roomName) => store.dispatch(gameRoom.createRoom(roomName)));
  socket.on(WS_ROOM_JOIN, (res) => store.dispatch(gameRoom.joinRoom(res)));
  socket.on(WS_ROOM_LEAVE, (roomName) => store.dispatch(gameRoom.leaveRoom(roomName)));
  socket.on(WS_ROOM_SEARCH, (rooms) => store.dispatch(gameBrowser.searchRooms(rooms)));
  socket.on(WS_ROOM_LIST_PLAYERS, (players) => store.dispatch(gameRoom.updatePlayers(players)));
}
