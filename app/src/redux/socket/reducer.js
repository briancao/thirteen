import { UPDATE_CONNECTION_STATUS } from './actions';

const initialState = {
  connected: false
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case UPDATE_CONNECTION_STATUS:
      return { ...state, connected: data}
    default:
      return state;
  }
}
