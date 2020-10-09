import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './GameRoom.module.css';

function GameRoom() {


  return <div className={styles.container}></div>;
}

export default connect(
  (state) => ({ cards: state.playerHand.cards, set: state.playerHand.set }),
  // (dispatch) => bindActionCreators({ wsConnect, wsDisconnect }, dispatch),
)(GameRoom);
