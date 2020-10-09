import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wsConnect, wsDisconnect } from '../../redux/socket/actions';
import CardHand from './CardHand';
import ActiveHand from './ActiveHand';
import styles from './GameContainer.module.css';

const GameContainer = ({ cards, set, wsConnect, wsDisconnect }) => {
  useEffect(() => {
    console.log('connect');
    wsConnect(process.env.REACT_APP_SOCKET_CONNECTION);
  }, []);

  return (
    <div className={styles.container}>
      <ActiveHand cards={set} />
      <CardHand cards={cards} />
    </div>
  );
};

export default connect(
  (state) => ({ cards: state.playerHand.cards, set: state.playerHand.set }),
  (dispatch) => bindActionCreators({ wsConnect, wsDisconnect }, dispatch),
)(GameContainer);
