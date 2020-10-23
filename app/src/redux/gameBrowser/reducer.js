import * as actions from './actions';

const initialState = {
  rooms: [],
  error: ''
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case actions.SEARCH_ROOMS:
      return { ...state, rooms: data}
    case actions.SET_JOIN_ERROR:
      return { ...state, error: data}
    default:
      return state;
  }
}
