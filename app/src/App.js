import React from 'react';
import logo from './logo.svg';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Socket from './components/Socket';
import './App.css';
import Card from './components/Card';
import CardHand from './components/CardHand';
import * as deckHelper from './utils/deck';

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  {}, // initial state
  composeWithDevTools(applyMiddleware(...middleware)),
);

function App() {
  let deck = deckHelper.sortCards(
    deckHelper.createShuffledDeck(1, false, true).filter((a) => a.suit === 'club'),
  );

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>

        <CardHand cards={deck} />
      </div>
    </Provider>
  );
}

export default App;
