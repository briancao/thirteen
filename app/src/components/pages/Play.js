import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Quick } from '../../assets/flash.svg';
import { ReactComponent as Search } from '../../assets/search.svg';
import { ReactComponent as Star } from '../../assets/star.svg';
import Card from '../common/Card';
import Icon from '../common/Icon';
import Slider from './../common/Slider';
import Navbar, { NavDefault } from './../layouts/Navbar';
import Screen from './../layouts/Screen';
import styles from './Play.module.css';

export default function Play() {
  const history = useHistory();

  const buttons = [
    {
      icon: <Quick />,
      label: 'QUICK PLAY',
      description: 'JUMP INTO A GAME AGAINST OTHER PLAYERS OF YOUR SKILL LEVEL',
    },
    {
      icon: <Star />,
      label: 'COMPETITIVE PLAY',
      description: 'COMPETE AGAINST OTHER PLAYERS AND WORK YOUR WAY UP THE RANKS',
    },
    {
      icon: <Search />,
      label: 'GAME BROWSER',
      description: 'FIND THAT PERFECT MATCH OR JUST CREATE ONE',
      // onClick: () => {
      //   history.push('/play/game-browser');
      // },
    },
  ];

  return (
    <Screen>
      <Navbar>
        <NavDefault label="PLAY" />
      </Navbar>

      <Slider data={buttons}>
        {buttons.map(({ icon, label, description, onClick }) => (
          <GameModeButton
            key={label}
            icon={icon}
            label={label}
            description={description}
            onClick={onClick}
          />
        ))}
      </Slider>
    </Screen>
  );
}

export function GameModeButton({
  className,
  icon,
  label,
  description,
  onClick = () => {
    console.log('test');
  },
}) {
  return (
    <Card className={styles['game-mode-container']}>
      <div className={styles['game-mode-body']}>
        <div className={styles['game-mode-icon']}>
          <Icon icon={icon} size="xlarge" />
        </div>
        <h2 className={styles['game-mode-label']}>{label}</h2>
        <div className={styles['game-mode-description']}>{description}</div>
      </div>
    </Card>
  );
}
