import React from 'react';
import styles from './Table.module.css';
import classNames from 'classnames';

export default function Table({ rows, columns, empty }) {
  return (
    <div className={styles.table}>
      <div className={classNames(styles.header)}>
        {columns.map(({ key, label, className, style, header }) => (
          <div
            key={key}
            className={classNames(styles.head, className, header?.className)}
            style={{ ...style, ...header?.style }}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {empty && rows.length === 0 && <div className={styles['empty-message']}>{empty}</div>}
        {rows.length > 0 &&
          rows.map((row, rowIndex) => (
            <div className={classNames(styles.row)} key={rowIndex}>
              {columns.map(({ key, render, className, style, cell }) => (
                <div
                  key={`${rowIndex}${key}`}
                  className={classNames(styles.cell, className, cell?.className)}
                  style={{ ...style, ...cell?.style }}
                >
                  {render ? render(row) : row[key]}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
