import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactComponent as Host } from '../../assets/crown.svg';
import { wsGameStart } from '../../redux/socket/actions';
import Icon from '../common/Icon';
import Button from './../common/Button';
import Card from './../common/Card';
import styles from './GameLobby.module.css';

const emptyUser = {
  id: '',
  username: '',
  guest: true,
};

function GameLobby({ roomName, players, user, wsGameStart }) {
  const [users, setUsers] = useState(
    Array.from({ length: 4 }, () => {
      return { ...emptyUser };
    }),
  );

  const isHost = players.some((a) => a.id === user.id && a.host === true);

  useEffect(() => {
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

    // Debt: needs to moved out of useMemo, probably calced on socket
    setUsers(userList);
  }, [players]);

  return (
    <div className={styles.container}>
      <div className={classNames(styles.row, styles['game-name'])}>
        {roomName && <h1 className={styles['room-name']}>{roomName}</h1>}
      </div>
      <div className={classNames(styles.row, styles['player-row'])}>
        {users && users.map((u) => <PlayerCard player={u} />)}
      </div>
      <div className={classNames(styles.row, styles['start-row'])}>
        {isHost && (
          <Button
            onClick={() => {
              wsGameStart(roomName);
            }}
            size="large"
            iconSize="small"
            className={styles['start-button']}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    roomName: state.gameRoom.roomName,
    players: state.gameRoom.players,
    user: state.user.user,
    connected: state.socket.connected,
  }),
  (dispatch) => bindActionCreators({ wsGameStart }, dispatch),
)(GameLobby);

export function PlayerCard({ player, onClick = () => {} }) {
  return (
    <Card className={styles['player-container']} onClick={onClick}>
      {!player.username && (
        <div className={classNames(styles['player-body'], styles['player-empty'])}>No Player</div>
      )}
      {player.username && (
        <div className={styles['player-body']}>
          <div className={styles['player-icon']}>
            <img src={`https://avatars.dicebear.com/api/human/${player.username}.svg`} alt="" />
          </div>
          <h3 className={styles['player-label']}>{player.username}</h3>
          {player.host && (
            <div className={styles['player-icon']}>
              <Icon icon={<Host />} size="small" />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
