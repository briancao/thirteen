import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CardHand from './CardHand';
import CardSet from './CardSet';
import styles from './GameContainer.module.css';
import socketIOClient from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { wsConnect, wsDisconnect } from '../redux/socket/actions';

const GameContainer = ({ cards, set, wsConnect, wsDisconnect }) => {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState();

  useEffect(() => {
    wsConnect(process.env.REACT_APP_SOCKET_CONNECTION);

    // const socket = socketIOClient(process.env.REACT_APP_SOCKET_CONNECTION);

    // socket.on('chat', (data) => {
    //   setResponse(data);
    // });

    // setSocket(socket);
  }, []);

  return (
    <div className={styles.container}>
      <CardSet cards={set} />
      <CardHand cards={cards} />
    </div>
  );
};

export default connect(
  (state) => ({ cards: state.playerHand.cards, set: state.playerHand.set }),
  (dispatch) => bindActionCreators({ wsConnect, wsDisconnect }, dispatch),
)(GameContainer);
