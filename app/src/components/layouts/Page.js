import classNames from 'classnames';
import React from 'react';
import styles from './Page.module.css';

export default function Page({ children }) {
  return <div className={classNames(styles.page, 'container')}>{children}</div>;
}
