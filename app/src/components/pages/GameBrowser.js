import React from 'react';
import styles from './GameBrowser.module.css';
import classNames from 'classnames';
import Table from '../common/Table';
import Screen from './../layouts/Screen';
import Navbar, { NavDefault } from './../layouts/Navbar';
import Button from './../common/Button';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';

export default function GameBrowser() {
  const columns = [
    { key: 'roomname', label: 'Room', className: 'col-6' },
    {
      key: 'players',
      label: 'Players',
      className: 'col-3',
    },
    {
      key: 'action',
      label: '',
      className: classNames(styles['join-button'], 'col-3'),
      render: () => <Button className={styles['create-button']}>JOIN</Button>,
    },
  ];

  return (
    <Screen>
      <Navbar>
        <NavDefault label="GAME BROWSER" />
      </Navbar>
      <div className={styles.row}>
        <Button icon={<Refresh />} iconSize="small" className={styles['refresh-button']} />
        <input type="text" placeholder="Filter" maxLength="4" />
      </div>
      <div className={styles.row}>
        <Button icon={<Plus />} size="large" iconSize="small" className={styles['create-button']}>
          Create Room
        </Button>
      </div>
      <div className={styles.row}>
        <Table columns={columns} rows={[]} empty="No Rooms Available" />
      </div>
    </Screen>
  );
}

export function FilterInput() {
  return <input type="text" placeholder="Filter" maxLength="4" />;
}
