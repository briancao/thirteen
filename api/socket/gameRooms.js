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

    socket.on(actions.WS_ROOM_CREATE, () => roomCreate(socket, io));
    socket.on(actions.WS_ROOM_JOIN, (roomName) => roomJoin(roomName, users, socket, io));
    socket.on(actions.WS_ROOM_LEAVE, (roomName) => roomLeave(roomName, users, socket, io));
    socket.on(actions.WS_ROOM_SEARCH, (search) => roomSearch(search, users, socket, io));
    socket.on(actions.WS_ROOM_LIST_PLAYERS, () => roomListPlayers(users, socket, io));

    socket.on('disconnect', () => {
      // Emit player left to all joined rooms
      Object.keys(socket.adapter.rooms).forEach((roomName) => {
        if (!!socket.adapter.rooms[roomName] && roomName.length === 4) {
          roomListPlayers(roomName, users, socket, io);
        }
      });

      socket.emit(actions.WS_DISCONNECTED);

      delete users[id];
    });
  });
};

function roomCreate(socket, io) {
  const roomName = generateGameRoomName(socket);

  socket.join(roomName);
  socket.emit(actions.WS_ROOM_CREATE, roomName);
  socket.to(roomName).emit(actions.WS_ROOM_CREATE);
}

function roomJoin(roomName, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  if (!rooms[roomName]) {
    socket.emit(actions.WS_ROOM_JOIN, { error: `Room ${roomName} does not exists` });
  } else if (rooms[roomName].length > 4) {
    socket.emit(actions.WS_ROOM_JOIN, { error: `Room ${roomName} is full` });
  } else {
    socket.join(roomName);
    socket.emit(actions.WS_ROOM_JOIN, { roomName });
    roomListPlayers(roomName, users, socket, io);
  }
}

function roomLeave(roomName, users, socket, io) {
  socket.leave(roomName);
  socket.emit(actions.WS_ROOM_LEAVE, roomName);
  roomListPlayers(roomName, users, socket, io);
}

function roomSearch(search, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  const gameRooms = Object.keys(rooms).reduce((acc, roomName) => {
    if (roomName.length === 4 && (!search || roomName.includes(search))) {
      const players = roomGetPlayers(rooms[roomName], users);

      var room = {
        name: roomName,
        players,
      };

      acc.push(room);
    }

    return acc;
  }, []);

  socket.emit(actions.WS_ROOM_SEARCH, gameRooms);
}

// Emits list of players in gameRoom
function roomListPlayers(roomName, users, socket, io) {
  const {
    adapter: { rooms },
  } = io.of('/game-room');

  if (rooms[roomName]) {
    io.of('/game-room')
      .to(roomName)
      .emit(actions.WS_ROOM_LIST_PLAYERS, roomGetPlayers(rooms[roomName], users, socket, io));
  }
}

// Return Array of players in room
function roomGetPlayers(room, users, socket, io) {
  const { sockets } = room;

  let host = false;

  const players = Object.keys(sockets).reduce((players, c) => {

    console.log(sockets);

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

  console.log(players);

  return players;
}
