import {
  WS_CONNECTED,
  WS_DISCONNECTED,
  WS_CREATE_ROOM,
  WS_LIST_PLAYERS,
  WS_JOIN_ROOM,
  WS_LEAVE_ROOM,
  WS_SEARCH_ROOMS,
  updateConnection,
} from './actions';
import * as gameRoom from '../gameRoom/actions';
import * as gameBrowser from '../gameBrowser/actions';

export default function configureSocket(socket, store) {
  socket.on(WS_CONNECTED, () => store.dispatch(updateConnection(true)));
  socket.on(WS_DISCONNECTED, () => store.dispatch(updateConnection(false)));
  socket.on(WS_CREATE_ROOM, (roomName) => store.dispatch(gameRoom.createRoom(roomName)));
  socket.on(WS_JOIN_ROOM, (res) => store.dispatch(gameRoom.joinRoom(res)));
  socket.on(WS_LEAVE_ROOM, (roomName) => store.dispatch(gameRoom.leaveRoom(roomName)));
  socket.on(WS_SEARCH_ROOMS, (rooms) => store.dispatch(gameBrowser.searchRooms(rooms)));
  socket.on(WS_LIST_PLAYERS, (players) => store.dispatch(gameRoom.updatePlayers(players)));
}
