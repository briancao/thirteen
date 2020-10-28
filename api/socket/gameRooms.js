import socketIO from 'socket.io';
import { verifySocket } from '../utils/auth';
import { generateGameRoomName } from '../utils/gameRoom';
import * as actions from '../utils/gameRoom';

export const gameRooms = (server) => {
  const io = socketIO.listen(server, {
    path: '/game-room',
    origins: 'http://localhost:3000',
  });

  const gameRoom = io.of('/game-room');

  let users = {};

  //listen for connection event
  gameRoom.use(verifySocket).on('connect', function (socket) {
    const { id, user } = socket;

    socket.emit(actions.WS_CONNECTED);

    users[id] = user;

    console.log('Socket Connection Made', id);
    console.log('User:', user);

    socket.on(actions.WS_CREATE_ROOM, () => createRoom(socket, io));
    socket.on(actions.WS_JOIN_ROOM, (roomName) => joinRoom(roomName, users, socket, io));
    socket.on(actions.WS_LEAVE_ROOM, (roomName) => leaveRoom(roomName, users, socket, io));
    socket.on(actions.WS_SEARCH_ROOMS, (search) => searchRooms(search, users, socket, io));
    socket.on(actions.WS_LIST_PLAYERS, () => listRoomPlayers(users, socket, io));

    socket.on('disconnect', () => {
      // Emit player left to all joined rooms
      Object.keys(socket.adapter.rooms).forEach((roomName) => {
        if (!!socket.adapter.rooms[roomName] && roomName.length === 4) {
          listRoomPlayers(roomName, users, socket, io);
        }
      });

      socket.emit(actions.WS_DISCONNECTED);

      delete users[id];
    });
  });
};

function createRoom(socket, io) {
  const roomName = generateGameRoomName(socket);

  socket.join(roomName);
  socket.emit(actions.WS_CREATE_ROOM, roomName);
  socket.to(roomName).emit(actions.WS_CREATE_ROOM);
}

function joinRoom(roomName, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  if (!rooms[roomName]) {
    socket.emit(actions.WS_JOIN_ROOM, { error: `Room ${roomName} does not exists` });
  } else if (rooms[roomName].length >= 4) {
    socket.emit(actions.WS_JOIN_ROOM, { error: `Room ${roomName} is full` });
  } else {
    socket.join(roomName);
    socket.emit(actions.WS_JOIN_ROOM, { roomName });
    listRoomPlayers(roomName, users, socket, io);
  }
}

function leaveRoom(roomName, users, socket, io) {
  socket.leave(roomName);
  socket.emit(actions.WS_LEAVE_ROOM, roomName);
  listRoomPlayers(roomName, users, socket, io);
}

function searchRooms(search, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  const gameRooms = Object.keys(rooms).reduce((acc, roomName) => {
    if (roomName.length === 4 && (!search || roomName.includes(search))) {
      const players = getRoomPlayers(rooms[roomName], users);

      var room = {
        name: roomName,
        players,
      };

      acc.push(room);
    }

    return acc;
  }, []);

  socket.emit(actions.WS_SEARCH_ROOMS, gameRooms);
}

function listRoomPlayers(roomName, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  if (rooms[roomName]) {
    io.of('/game-room')
      .to(roomName)
      .emit(actions.WS_LIST_PLAYERS, getRoomPlayers(rooms[roomName], users));
  }
}

function getRoomPlayers(room, users) {
  const { sockets } = room;

  let host = false;

  return Object.keys(sockets).reduce((players, c) => {
    if (sockets[c]) {
      const user = { ...users[c] };

      if (!host) {
        host = true;
        user.host = true;
      }
      players.push(user);
    }

    return players;
  }, []);
}
