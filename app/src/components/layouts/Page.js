import React from 'react';
import styles from './Page.module.css';
import classNames from 'classnames'


export default function Page({ children }) {
  return <div className={classNames(styles.page, 'container-fluid')}>{children}</div>;
}
