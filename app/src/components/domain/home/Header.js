import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import Icon from '../../common/Icon';
import styles from './Header.module.css';
import PlayButton from './PlayButton';
import classNames from 'classnames';

export default function Header() {
  return (
    <div className={classNames(styles.container, 'col')}>
      <h1 className={styles.h1}>
        Thirteen Cards <Icon className={styles.icon} icon={<Logo />} size="xlarge" />
      </h1>
      <div>
        <PlayButton />
      </div>
    </div>
  );
}
