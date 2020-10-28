import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { wsJoinRoom, wsLeaveRoom } from '../../redux/socket/actions';
import Navbar, { NavDefault } from './../layouts/Navbar';
import Screen from './../layouts/Screen';
import styles from './GameRoom.module.css';
import Card from './../common/Card';
import Icon from '../common/Icon';
import classNames from 'classnames';
import { ReactComponent as Star } from '../../assets/star.svg';

const emptyUser = {
  id: '',
  username: '',
  guest: true,
};

function GameRoom({ roomName, connected, players, wsJoinRoom, wsLeaveRoom }) {
  const history = useHistory();
  const [users, setUsers] = useState(
    Array.from({ length: 4 }, () => {
      return { ...emptyUser };
    }),
  );

  useEffect(() => {
    if (connected && roomName) {
      wsJoinRoom(roomName);
    }
  }, [roomName, connected, wsJoinRoom]);

  useMemo(() => {
    let userList;

    //remove users
    userList = users.map((u) => {
      if (players.some((p) => p.id === u.id)) {
        return u;
      }

      return { ...emptyUser };
    });

    //add players into empty slots
    players.forEach((player) => {
      let userIndex = userList.findIndex((a) => a.id === player.id);

      if (userIndex === -1) {
        let emptyIndex = userList.findIndex((a) => !a.id);
        userList[emptyIndex] = player;
      } else {
        userList[userIndex] = player;
      }
    });

    setUsers(userList);
  }, [players]);

  function handleBackButton() {
    wsLeaveRoom(roomName);
    history.push('/play/game-browser');
  }

  return (
    <Screen>
      <Navbar>
        <NavDefault label="GAME ROOM" onClick={() => handleBackButton()} />
      </Navbar>
      <div className={styles.container}>
        <div className={styles.row}>
          {roomName && <h1 className={styles['room-name']}>{roomName}</h1>}
        </div>
        <div className={classNames(styles.row, styles['player-row'])}>
          {users && users.map((u) => <PlayerCard label={u.username} />)}
        </div>
      </div>
    </Screen>
  );
}

export default connect(
  (state) => ({
    roomName: state.gameRoom.roomName,
    players: state.gameRoom.players,
    connected: state.socket.connected,
  }),
  (dispatch) => bindActionCreators({ wsJoinRoom, wsLeaveRoom }, dispatch),
)(GameRoom);

export function PlayerCard({ icon, label, description, onClick = () => {} }) {
  return (
    <Card className={styles['player-container']} onClick={onClick}>
      <div className={styles['player-body']}>
        <div className={styles['player-icon']}>
          <Icon icon={icon} size="xlarge" />
        </div>
        <h3 className={styles['player-label']}>{label}</h3>
        <div className={styles['player-description']}>{description}</div>
      </div>
    </Card>
  );
}
