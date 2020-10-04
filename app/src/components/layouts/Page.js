import React from 'react';
import styles from './Page.module.css';
import classNames from 'classnames';
import MenuBar from './../common/MenuBar';

export default function Page({ children }) {
  return (
    <div className={classNames(styles.page, 'container')}>
      <MenuBar />
      {children}
    </div>
  );
}
