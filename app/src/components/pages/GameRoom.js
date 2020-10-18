import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './GameRoom.module.css';
import Screen from './../layouts/Screen';
import Navbar, { NavDefault } from './../layouts/Navbar';

function GameRoom() {
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
  (state) => ({ roomName: state.gameRoom.roomName }),
  null
)(GameRoom);
