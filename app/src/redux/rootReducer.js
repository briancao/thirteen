import { combineReducers } from 'redux';
import playerHand from './playerHand/reducer';
import user from './user/reducer';
import gameRoom from './gameRoom/reducer';

const rootReducer = combineReducers({
  gameRoom,
  playerHand,
  user,
});

export default rootReducer;
