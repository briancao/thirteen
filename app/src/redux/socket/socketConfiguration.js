import { WS_CONNECT, WS_DISCONNECT, WS_CREATE_ROOM, WS_JOIN_ROOM, WS_LIST_ROOMS } from './actions';
import * as playerHand from '../playerHand/actions';
import * as gameRoom from '../gameRoom/actions';

let store = {};

function createRoom(roomName) {
  store.dispatch(gameRoom.createRoom(roomName));
}

function joinRoom(roomName) {
  store.dispatch(gameRoom.joinRoom(roomName));
}

function listRooms(rooms) {
  store.dispatch(gameRoom.listRooms(rooms));
}

export default function configureSocket(socket, storeParam) {
  store = storeParam;

  socket.on(WS_CREATE_ROOM, (roomName) => createRoom(roomName));
  socket.on(WS_JOIN_ROOM, (roomName) => joinRoom(roomName));
  socket.on(WS_LIST_ROOMS, (rooms) => listRooms(rooms));
}
