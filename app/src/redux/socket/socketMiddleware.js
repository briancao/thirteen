import socketIOClient from 'socket.io-client';
import * as playerHand from '../playerHand/actions';
import { onOpen, onClose } from './socketConfiguration';
import Cookies from 'js-cookie';

const socketMiddleware = () => {
  let socket = null;

  // the middleware part of this function
  return (store) => (next) => (action) => {
    const { type, host } = action;

    switch (type) {
      case 'WS_UPDATE_ACTIVE_HAND':
        socket.emit('UPDATE_ACTIVE_HAND', action.data);
        break;
      case 'WS_START_GAME':
        socket.emit('START_GAME', action.data);
        break;
      case 'WS_CONNECT':
        let token = Cookies.get('thirteen-profile');
        if (!token) {
          token = "test";
        }

        // close existing connection
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = socketIOClient(`${host}/game-room`, {
          path: '/game-room',
          query: { token },
          reconnectionAttempts: 3,
        });

        // default websocket handlers
        socket.on('connect', onOpen(store));
        socket.on('close', onClose(store));

        // custom websocket handlers
        socket.on('UPDATE_OPPONENT_HAND', (data) => {
          store.dispatch(playerHand.updateOpponent(data.data));
        });

        socket.on('TEST', () => {
          console.log("TEST TEST TEST");
        });

        socket.on('INVALID_TOKEN', () => {
          window.location.href = '/';
        });

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();
