import classNames from 'classnames';
import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Play } from '../../assets/video-play.svg';
import Icon from './../common/Icon';
import Screen from './../layouts/Screen';
import styles from './Home.module.css';
import Button from './../common/Button';
import { useHistory } from 'react-router-dom';

export default function Home() {
  return (
    <Screen>
      <Header />
      <Buttons />
    </Screen>
  );
}

export function Header() {
  return (
    <div className={classNames(styles.header)}>
      <h1 className={styles.h1}>
        Thirteen Cards <Icon className={styles.icon} icon={<Logo />} size="xlarge" />
      </h1>
    </div>
  );
}

export function Buttons() {
  const history = useHistory()  

  return (
    <div className={styles.buttons}>
      <Button className={styles.button} size="medium" icon={<Play />} iconSize="medium" onClick={() => history.push('/play')}>
        <div className={styles['button-text']}>
          Play
        </div>
      </Button>
    </div>
  )
}
