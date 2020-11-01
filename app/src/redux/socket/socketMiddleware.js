import Cookies from 'js-cookie';
import socketIOClient from 'socket.io-client';
import configureSocket from './socketConfiguration';
import * as actions from './actions';

const socketMiddleware = () => {
  let socket = null;

  // the middleware part of this function
  return (store) => (next) => (action) => {
    const { type, data } = action;

    switch (type) {
      case actions.WS_CONNECT:
        let token = Cookies.get('thirteen-profile');

        // close existing connection
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = socketIOClient(`${data.connection}/game-room`, {
          path: '/game-room',
          query: { token },
          reconnectionAttempts: 3,
        });

        configureSocket(socket, store);
        break;
      case actions.WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case actions.WS_ROOM_CREATE:
        socket.emit(actions.WS_ROOM_CREATE);
        break;
      case actions.WS_ROOM_JOIN:
        socket.emit(actions.WS_ROOM_JOIN, data.roomName);
        break;
      case actions.WS_ROOM_LEAVE:
        socket.emit(actions.WS_ROOM_LEAVE, data.roomName);
        break;
      case actions.WS_ROOM_SEARCH:
        if (socket != null) {
          socket.emit(actions.WS_ROOM_SEARCH, data.search);
        }
        break;
      
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
