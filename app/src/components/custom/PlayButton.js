import React from 'react';
import { Link } from 'react-router-dom';
import Button from './../common/Button';
import styles from './PlayButton.module.css';
import { ReactComponent as Play } from '../../assets/video-play.svg';

export default function PlayButton() {
  return (
    <Link to="/play" style={{ textDecoration: 'none' }}>
      <Button className={styles.button} size="medium" icon={<Play />} iconSize="small">
        Play
      </Button>
    </Link>
  );
}
