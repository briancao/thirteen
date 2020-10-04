import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './App.css';
import Home from './components/pages/Home';
import Ladder from './components/pages/Ladder';
import Login from './components/pages/Login';
import Play from './components/pages/Play';
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import Settings from './components/pages/Settings';
import rootReducer from './redux/rootReducer';
import socketMiddleware from './redux/socket/socketMiddleware';
import * as deckHelper from './utils/deck';
import GameBrowser from './components/pages/play/GameBrowser';

const middleware = [logger, socketMiddleware, thunk];

const store = createStore(
  rootReducer,
  {
    playerHand: {
      cards: deckHelper.sortCards(
        deckHelper
          .createShuffledDeck(1, false, true)
          .filter(
            (a) =>
              (a.suit === 'spade' && window.location.href.endsWith(1) && a.value < 20) ||
              (a.suit === 'club' && window.location.href.endsWith(2) && a.value < 7) ||
              (a.suit === 'diamond' && window.location.href.endsWith(3) && a.value < 10) ||
              (a.suit === 'heart' && window.location.href.endsWith(4) && a.value < 13),
          ),
      ),
      set: [],
      activeHand: {
        cards: [],
        isValid: false,
      },
    },
  }, // initial state
  composeWithDevTools(applyMiddleware(...middleware)),
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <Router>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/play" component={Play} />
          <Route exact path="/play/game-browser" component={GameBrowser} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/ladder" component={Ladder} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
