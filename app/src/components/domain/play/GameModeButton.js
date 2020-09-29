import classNames from 'classnames';
import React from 'react';
import Icon from '../../common/Icon';
import Card from './../../common/Card';
import styles from './GameModeButton.module.css';

export default function GameModeButton({
  className,
  icon,
  label,
  description,
  onClick = () => {},
}) {
  return (
    <Card className={styles.container} onClick={onClick}>
      <div className={classNames(className, styles.container)}>
        <div className={styles.icon}>
          <Icon icon={icon} size="xlarge" />
        </div>
        <h2 className={styles.label}>{label}</h2>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
}
