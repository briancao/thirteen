import socketIO from 'socket.io';
import { verifySocket } from '../utils/auth';
import {
  generateGameRoomName,
  WS_CONNECTED,
  WS_DISCONNECTED,
  WS_CREATE_ROOM,
  WS_JOIN_QUICK_GAME,
  WS_JOIN_ROOM,
  WS_SEARCH_ROOMS,
  WS_LIST_PLAYERS,
} from '../utils/gameRoom';

export const gameRooms = (server) => {
  const io = socketIO.listen(server, {
    path: '/game-room',
    origins: 'http://localhost:3000',
  });

  const gameRoom = io.of('/game-room');

  let users = {};

  //listen for connection event
  gameRoom.use(verifySocket).on('connect', function (socket) {
    //console.log("Socket Connection Made:", socket);
    const { id, user } = socket;

    socket.emit(WS_CONNECTED);

    users[id] = user;

    console.log('Socket Connection Made', id);
    console.log('User:', user);

    socket.on(WS_CREATE_ROOM, () => createRoom(socket, io));
    socket.on(WS_JOIN_ROOM, (roomName) => joinRoom(roomName, users, socket, io));
    socket.on(WS_JOIN_QUICK_GAME, () => joinRoom('QUICK_GAME', socket, io));
    socket.on(WS_SEARCH_ROOMS, (search) => searchRooms(search, users, socket, io));
    socket.on(WS_LIST_PLAYERS, () => listRoomPlayers(users, socket, io));

    socket.on('disconnect', () => {
      socket.emit(WS_DISCONNECTED);

      delete users[id];
      console.log(users);

      socket.rooms;
    });
  });
};

function createRoom(socket, io) {
  const roomName = generateGameRoomName(socket);

  socket.join(roomName);
  socket.emit(WS_CREATE_ROOM, roomName);
  socket.to(roomName).emit(WS_CREATE_ROOM);
}

function joinRoom(roomName, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  console.log(1)
  console.log(1)
  
  if (!rooms[roomName]) {
    console.log(1)
    socket.emit(WS_JOIN_ROOM, { error: `Room ${roomName} does not exists`});
  }
  else if (rooms[roomName].length >= 4) {
    console.log(2)
    socket.emit(WS_JOIN_ROOM, { error: `Room ${roomName} is full`});
  } else {
    socket.join(roomName);
    socket.emit(WS_JOIN_ROOM, { roomName });
    listRoomPlayers(roomName, users, socket, io);
  }
  

}

function searchRooms(search, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  console.log(Object.keys(rooms));

  const gameRooms = Object.keys(rooms).reduce((acc, roomName) => {
    console.log(search)
    console.log(roomName)

    if (roomName.length === 4 &&
      (!search || roomName.includes(search))) {
      const players = getRoomPlayers(rooms[roomName], users);

      var room = {
        name: roomName,
        players,
      };

      acc.push(room);
    }

    return acc;
  }, []);

  console.log(gameRooms);

  socket.emit(WS_SEARCH_ROOMS, gameRooms);
}

function listRoomPlayers(roomName, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  io.of('/game-room').to(roomName).emit(WS_LIST_PLAYERS, getRoomPlayers(rooms[roomName], users));
}

function getRoomPlayers(room, users) {
  const { sockets } = room;

  return Object.keys(sockets).reduce((p, c) => {
    p.push(users[c]);
    return p;
  }, []);
}
