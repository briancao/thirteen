import classNames from 'classnames';
import React from 'react';
import styles from './Screen.module.css';
import useFullScreen from './../../hooks/useFullscreen';

export default function Screen({ children }) {
  const fullscreen = useFullScreen();

  return (
    <div className={styles.container}>
      <div className={classNames(styles.screen)}>{children}</div>
    </div>
  );
}
