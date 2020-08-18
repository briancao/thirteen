import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './App.css';
import Login from './components/Login/Login';
import GameContainer from './components/Game/GameContainer';
import rootReducer from './redux/rootReducer';
import socketMiddleware from './redux/socket/reducer';
import * as deckHelper from './utils/deck';

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
        <Router>
          <Route path="/" component={Login} />
          <Route path="/game" component={GameContainer} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
