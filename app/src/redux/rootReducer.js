import { combineReducers } from 'redux';
import playerHand from './playerHand/reducer';
import user from './user/reducer';
import gameRoom from './gameRoom/reducer';
import gameBrowser from './gameBrowser/reducer';
import socket from './socket/reducer';

const rootReducer = combineReducers({
  gameRoom,
  playerHand,
  user,
  gameBrowser,
  socket
});

export default rootReducer;