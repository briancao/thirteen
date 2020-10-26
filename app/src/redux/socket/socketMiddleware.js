import Cookies from 'js-cookie';
import socketIOClient from 'socket.io-client';
import configureSocket from './socketConfiguration';
import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CREATE_ROOM,
  WS_JOIN_ROOM,
  WS_LEAVE_ROOM,
  WS_SEARCH_ROOMS,
} from './actions';

const socketMiddleware = () => {
  let socket = null;

  // the middleware part of this function
  return (store) => (next) => (action) => {
    const { type, data } = action;

    switch (type) {
      case WS_CONNECT:
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
      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case WS_CREATE_ROOM:
        socket.emit(WS_CREATE_ROOM);
        break;
      case WS_JOIN_ROOM:
        socket.emit(WS_JOIN_ROOM, data.roomName);
        break;
      case WS_LEAVE_ROOM:
        socket.emit(WS_LEAVE_ROOM, data.roomName);
        break;
      case WS_SEARCH_ROOMS:
        const { search } = data;

        if (socket != null) {
          socket.emit(WS_SEARCH_ROOMS, data.search);
        }
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
