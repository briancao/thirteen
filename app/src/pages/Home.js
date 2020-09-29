import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Play } from '../assets/video-play.svg';
import MenuBar from '../components/common/MenuBar';
import Button from './../components/common/Button';
import Card from './../components/common/Card';
import Icon from './../components/common/Icon';
import Page from './../components/layouts/Page';
import TopPerformance from './../components/metrics/TopPerformance';
import styles from './Home.module.css';

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
          <div className="row">
            <div className="col-8">
              <Card label="RECENT MATCHES">
                <TopPerformance data={data} />
              </Card>
            </div>
            <div className="col-4">
              <Card label="ONGOING MATCHES" />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <Card label="CURRENT SEASON RANK" />
            </div>
            <div className="col-4">
              <Card label="PERFORMANCE OVERVIEW" />
            </div>
            <div className="col-4">
              <Card label="TOP PERFORMANCE" />
            </div>
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
