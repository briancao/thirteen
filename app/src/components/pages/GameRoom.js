import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { wsRoomJoin, wsRoomLeave } from '../../redux/socket/actions';
import Navbar, { NavDefault } from './../layouts/Navbar';
import Screen from './../layouts/Screen';
import GameLobby from './GameLobby';

function GameRoom({ roomName, connected, players, wsRoomJoin, wsRoomLeave }) {
  const history = useHistory();

  useEffect(() => {
    if (connected && roomName) {
      wsRoomJoin(roomName);
    }
  }, [roomName, connected, wsRoomJoin]);

  function handleBackButton() {
    wsRoomLeave(roomName);
    history.push('/play/game-browser');
  }

  return (
    <Screen>
      <Navbar>
        <NavDefault label="GAME ROOM" onClick={() => handleBackButton()} />
      </Navbar>
      <GameLobby />
    </Screen>
  );
}

export default connect(
  (state) => ({
    roomName: state.gameRoom.roomName,
    players: state.gameRoom.players,
    connected: state.socket.connected,
  }),
  (dispatch) => bindActionCreators({ wsRoomJoin, wsRoomLeave }, dispatch),
)(GameRoom);
