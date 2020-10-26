import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Back } from '../../assets/back-arrow.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import Button from './../common/Button';
import styles from './Navbar.module.css';

export default function Navbar({ className, children, back, home }) {
  return <div className={classNames(styles['nav-bar'], className)}>{children}</div>;
}

export function NavDefault({ className, label, showBack = true, showHome = false, onClick }) {
  const history = useHistory();

  return (
    <div className={styles['nav-container']}>
      {showBack && (
        <Button
          className={styles['nav-button']}
          icon={<Back />}
          iconSize="small"
          onClick={onClick ? () => onClick() : () => history.push(history.goBack())}
        />
      )}
      {label && <div className={styles.label}>{label}</div>}
      {showHome && (
        <Button
          className={styles['nav-button']}
          icon={<Home />}
          iconSize="small"
          onClick={() => history.push('/')}
        />
      )}
    </div>
  );
}
