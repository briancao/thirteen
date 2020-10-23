import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wsJoinRoom } from '../../redux/socket/actions';
import Navbar, { NavDefault } from './../layouts/Navbar';
import Screen from './../layouts/Screen';
import styles from './GameRoom.module.css';

function GameRoom({ roomName, connected, wsJoinRoom }) {
  useEffect(() => {
    if (connected && roomName) {
      wsJoinRoom(roomName);
    }
  }, [roomName, connected]);

  return (
    <Screen>
      <Navbar>
        <NavDefault label="GAME ROOM" />
      </Navbar>
      <div className={styles.container}>TEST TEST TEST</div>
    </Screen>
  );
}

export default connect(
  (state) => ({ roomName: state.gameRoom.roomName, connected: state.socket.connected }),
  (dispatch) => bindActionCreators({ wsJoinRoom }, dispatch),
)(GameRoom);
