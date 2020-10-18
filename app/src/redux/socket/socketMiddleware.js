import Cookies from 'js-cookie';
import socketIOClient from 'socket.io-client';
import configureSocket from './socketConfiguration';
import { WS_CONNECT, WS_DISCONNECT, WS_CREATE_ROOM, WS_LIST_ROOMS } from './actions';

const socketMiddleware = () => {
  let socket = null;

  // the middleware part of this function
  return (store) => (next) => (action) => {
    const { type } = action;

    switch (type) {
      case WS_CONNECT:
        const { connection } = action;

        let token = Cookies.get('thirteen-profile');

        // close existing connection
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = socketIOClient(`${connection}/game-room`, {
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
        console.log('websocket closed');
        break;
      case WS_CREATE_ROOM:
        console.log('websocket: create room');
        socket.emit(WS_CREATE_ROOM);
        break;
      case WS_LIST_ROOMS:
        console.log('websocket: list rooms');
        if (socket != null) {
          socket.emit(WS_LIST_ROOMS);
        }
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();
