import * as socketActions from './actions';

const onOpen = (store) => (action) => {
  // console.log('websocket open', action.target.url);
  // store.dispatch(socketActions.wsConnected(action.target.url));
};

const onClose = (store) => () => {
  store.dispatch(socketActions.wsDisconnect());
};

export { onOpen, onClose };
