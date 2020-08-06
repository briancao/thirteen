import { combineReducers } from 'redux';
import playerHand from './playerHand/reducer';

const rootReducer = combineReducers({
  playerHand,
});

export default rootReducer;
