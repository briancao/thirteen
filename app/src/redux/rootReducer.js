import { combineReducers } from 'redux';
import playerHand from './playerHand/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
  playerHand,
  user,
});

export default rootReducer;
