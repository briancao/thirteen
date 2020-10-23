import {
  WS_CONNECTED,
  WS_DISCONNECTED,
  WS_CREATE_ROOM,
  WS_LIST_PLAYERS,
  WS_JOIN_ROOM,
  WS_SEARCH_ROOMS,
  updateConnection,
} from './actions';
import * as playerHand from '../playerHand/actions';
import * as gameRoom from '../gameRoom/actions';
import * as gameBrowser from '../gameBrowser/actions';

let store = {};

function createRoom(roomName) {
  store.dispatch(gameRoom.createRoom(roomName));
}

function joinRoom(res) {
  store.dispatch(gameRoom.joinRoom(res));
}

function searchRooms(rooms) {
  store.dispatch(gameBrowser.searchRooms(rooms));
}

function listPlayers(players) {
  store.dispatch(gameRoom.updatePlayers(players));
}

function updateSocketStatus(status) {
  store.dispatch(updateConnection(status));
}

export default function configureSocket(socket, storeParam) {
  store = storeParam;

  socket.on(WS_CONNECTED, () => updateSocketStatus(true));
  socket.on(WS_DISCONNECTED, () => updateSocketStatus(false));
  socket.on(WS_CREATE_ROOM, (roomName) => createRoom(roomName));
  socket.on(WS_JOIN_ROOM, (res) => joinRoom(res));
  socket.on(WS_SEARCH_ROOMS, (rooms) => searchRooms(rooms));
  socket.on(WS_LIST_PLAYERS, (players) => listPlayers(players));
}
