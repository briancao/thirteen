import Cookies from 'js-cookie';
import socketIOClient from 'socket.io-client';
import configureSocket from './socketConfiguration';
import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CREATE_ROOM,
  WS_JOIN_ROOM,
  WS_SEARCH_ROOMS,
} from './actions';

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
      case WS_JOIN_ROOM:
        const { roomName } = action;

        console.log('websocket: join room');

        if (socket != null) {  
          socket.emit(WS_JOIN_ROOM, roomName);
        }
        break;
      case WS_SEARCH_ROOMS:
        const { search } = action;

        console.log('websocket: search rooms');
        if (socket != null) {
          socket.emit(WS_SEARCH_ROOMS, search);
        }
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();
