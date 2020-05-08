import { combineReducers } from "redux";
import testReducer from "./reducer";
import testReducer2 from "./reducer2";

const rootReducer = combineReducers({
    testReducer,
    testReducer2
});

export default rootReducer;
