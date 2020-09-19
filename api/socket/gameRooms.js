import socketIO from 'socket.io';
import { verifySocket } from '../utils/auth';
import * as thirteenHelper from '../utils/thirteen';

const initPlayers = [
  { name: 'player 1', position: 0, user_id: null, cards: [], socketId: '' },
  { name: 'player 2', position: 1, user_id: null, cards: [], socketId: '' },
  { name: 'player 3', position: 2, user_id: null, cards: [], socketId: '' },
  { name: 'player 4', position: 3, user_id: null, cards: [], socketId: '' },
];

export const gameRooms = (server) => {
  const io = socketIO.listen(server, {
    path: '/game-room',
    origins: 'http://localhost:3000',
  });

  const gameRoom = io.of('/game-room');

  //listen for connection event
  gameRoom.use(verifySocket).on('connection', function (socket) {
    //console.log("Socket Connection Made:", socket);
    console.log('Socket Connection Made', socket.id);

    socket.on('UPDATE_ACTIVE_HAND', (data) => updateOpponentHand(data, socket));

    socket.on('disconnect', () => {
      io.sockets.emit('chat', { data: `${socket.id} has left chat` });
    });
  });
};

export const updateOpponentHand = (data, socket) => {
  console.log(data);
  // sending to all clients except sender
  socket.broadcast.emit('UPDATE_OPPONENT_HAND', { action: 'UPDATE_OPPONENT_HAND', data });
};
