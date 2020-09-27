import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';

export default function Card({ className, bodyClassName, label, children }) {
  return (
    <div className={classNames(styles.card, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={classNames(styles.body, bodyClassName)}>{children}</div>
    </div>
  );
}
