import socketIO from 'socket.io';
import { verifySocket } from '../utils/auth';
import {
  generateGameRoomName,
  WS_CREATE_ROOM,
  WS_JOIN_QUICK_GAME,
  WS_JOIN_ROOM,
  WS_LIST_ROOMS,
} from '../utils/gameRoom';

export const gameRooms = (server) => {
  const io = socketIO.listen(server, {
    path: '/game-room',
    origins: 'http://localhost:3000',
  });

  const gameRoom = io.of('/game-room');

  let users = [];
  let rooms = [];

  //listen for connection event
  gameRoom.use(verifySocket).on('connect', function (socket) {
    //console.log("Socket Connection Made:", socket);
    const { id, user } = socket;

    users.push(user);

    console.log('Socket Connection Made', id);
    console.log('User:', user);

    socket.on(WS_CREATE_ROOM, () => createRoom(socket, io));
    socket.on(WS_JOIN_ROOM, (roomName) => joinRoom(roomName, socket, io));
    socket.on(WS_JOIN_QUICK_GAME, () => joinRoom('QUICK_GAME', socket, io));
    socket.on(WS_LIST_ROOMS, () => listRooms(socket, io));



    socket.on('disconnect', () => {
      users = users.filter((a) => a.id !== user.id);
      console.log(users);
    });
  });
};

function createRoom(socket, io) {
  const roomName = generateGameRoomName(socket);

  socket.join(roomName);
  socket.emit(WS_CREATE_ROOM, roomName);

  socket.to(roomName).emit(WS_CREATE_ROOM);
}

function joinRoom(roomName, socket, io) {
  socket.join(roomName);
  socket.emit(WS_JOIN_ROOM, roomName);

  socket.to(roomName).emit(WS_JOIN_ROOM);
}

function listRooms(socket, io) {
  console.log('list room')
  console.log(io.of('/game-room').adapter.rooms);
  console.log(socket.rooms);
}
