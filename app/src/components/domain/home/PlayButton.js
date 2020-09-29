import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Play } from '../../../assets/video-play.svg';
import Button from '../../common/Button';
import styles from './PlayButton.module.css';

export default function PlayButton() {
  return (
    <Link to="/play" style={{ textDecoration: 'none' }}>
      <Button className={styles.button} size="medium" icon={<Play />} iconSize="small">
        PLAY
      </Button>
    </Link>
  );
}
