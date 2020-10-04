import React from 'react';
import styles from './GameBrowser.module.css';
import classNames from 'classnames';
import Table from '../../common/Table';

export default function GameBrowser() {
  const columns = [
    { key: 'username', label: 'Username', className: 'col-6 col-md-4' },
    {
      key: 'is_admin',
      label: 'Administrator',
      className: 'col-6 col-md-4',
    },
    {
      className: classNames(styles.buttons, 'col-12 col-md-4 pt-2 pt-md-0'),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={classNames(styles['button-row'], 'row')}></div>
      <Table columns={columns} rows={[]} empty="No Rooms Available"/>
    </div>
  );
}
