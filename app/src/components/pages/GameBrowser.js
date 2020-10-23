import React from 'react';
import styles from './GameBrowser.module.css';
import classNames from 'classnames';
import Table from '../common/Table';
import Screen from './../layouts/Screen';
import Navbar, { NavDefault } from './../layouts/Navbar';
import Button from './../common/Button';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wsCreateRoom, wsSearchRooms, wsJoinRoom } from '../../redux/socket/actions';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function GameBrowser({ wsCreateRoom, wsSearchRooms, wsJoinRoom, roomName, rooms }) {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const columns = [
    { key: 'name', label: 'Room', className: 'col-6' },
    {
      key: 'players',
      label: 'Players',
      className: 'col-3',
      render: (row) => row.players.length,
    },
    {
      key: 'action',
      label: '',
      className: classNames(styles['join-button'], 'col-3'),
      render: (row) => (
        <Button onClick={() => wsJoinRoom(row.name)} className={styles['create-button']}>
          JOIN
        </Button>
      ),
    },
  ];

  useEffect(() => {
    wsSearchRooms();
  }, []);

  useEffect(() => {
    if (roomName) {
      history.push('/play/game-room');
    }
  }, [roomName]);

  return (
    <Screen>
      <Navbar>
        <NavDefault label="GAME BROWSER" />
      </Navbar>
      <div className={styles.row}>
        <Button
          onClick={() => wsSearchRooms(search)}
          icon={<Refresh />}
          iconSize="small"
          className={styles['refresh-button']}
        />
        <input
          id="search"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value.toUpperCase());
          }}
          value={search}
          placeholder="Filter"
          maxLength="4"
        />
      </div>
      <div className={styles.row}>
        <Button
          onClick={() => wsCreateRoom()}
          icon={<Plus />}
          size="large"
          iconSize="small"
          className={styles['create-button']}
        >
          Create Room
        </Button>
      </div>
      <div className={styles.row}>
        <Table columns={columns} rows={rooms} empty="No Rooms Available" />
      </div>
    </Screen>
  );
}

export default connect(
  (state) => ({ roomName: state.gameRoom.roomName, rooms: state.gameBrowser.rooms }),
  (dispatch) => bindActionCreators({ wsCreateRoom, wsJoinRoom, wsSearchRooms }, dispatch),
)(GameBrowser);
