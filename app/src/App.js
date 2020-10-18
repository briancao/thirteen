import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './App.css';
import Socket from './components/common/Socket';
import GameBrowser from './components/pages/GameBrowser';
import GameRoom from './components/pages/GameRoom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Play from './components/pages/Play';
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import Settings from './components/pages/Settings';
import rootReducer from './redux/rootReducer';
import socketMiddleware from './redux/socket/socketMiddleware';
import history from './utils/history';

const middleware = [logger, socketMiddleware, thunk];

const store = createStore(
  rootReducer,
  {}, // initial state
  composeWithDevTools(applyMiddleware(...middleware)),
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Socket />
        <Router history={history}>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/play" component={Play} />
          <Route exact path="/play/game-browser" component={GameBrowser} />
          <Route exact path="/play/game-room" component={GameRoom} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
