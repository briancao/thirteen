import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Play } from '../../assets/video-play.svg';
import Card from './../common/Card';
import Icon from './../common/Icon';
import Page from './../layouts/Page';
import styles from './Home.module.css';
import TopPerformance from './../metrics/TopPerformance';
import Button from './../common/Button';

export default function Home() {
  var data = [
    { result: 'W', placement: 1 },
    { result: 'L', placement: 3 },
    { result: 'L', placement: 4 },
    { result: 'W', placement: 2 },
    { result: 'W', placement: 2 },
    { result: 'L', placement: 4 },
  ];

  return (
    <Page>
      <div className="container-fluid">
        <div className="col">
          <div className="row">
            <Header />
          </div>
        </div>
      </div>
    </Page>
  );
}

export function Header() {
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

export function PlayButton() {
  return (
    <Link to="/play" style={{ textDecoration: 'none' }}>
      <Button className={styles.button} size="medium" icon={<Play />} iconSize="small">
        Play
      </Button>
    </Link>
  );
}
