import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wsConnect, wsDisconnect } from '../../redux/socket/actions';
import styles from './GameRoom.module.css';

const GameContainer = ({ cards, set, wsConnect, wsDisconnect }) => {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState();

  useEffect(() => {
    wsConnect(process.env.REACT_APP_SOCKET_CONNECTION);
  }, []);

  return (
    <div className={styles.container}>
    </div>
  );
};

export default connect(
  (state) => ({ cards: state.playerHand.cards, set: state.playerHand.set }),
  (dispatch) => bindActionCreators({ wsConnect, wsDisconnect }, dispatch),
)(GameContainer);
