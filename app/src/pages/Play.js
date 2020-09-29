import classNames from 'classnames';
import React from 'react';
import { animated, useTrail } from 'react-spring';
import { ReactComponent as Quick } from '../assets/flash.svg';
import { ReactComponent as Search } from '../assets/search.svg';
import { ReactComponent as Star } from '../assets/star.svg';
import Card from './../components/common/Card';
import Icon from './../components/common/Icon';
import Page from './../components/layouts/Page';
import styles from './Play.module.css';

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
  },
];

export default function Play() {
  const trail = useTrail(buttons.length, {
    opacity: 1,
    transform: 'translateX(0px)',
    from: { opacity: 0, transform: 'translateX(150px)' },
  });

  return (
    <Page>
      <div className="container-fluid fill-height">
        <div className="row align-items-center fill-height">
          {trail.map((props, index) => (
            <animated.div key={`button-${index}`} style={props} className="col">
              <GameModeButton
                icon={buttons[index].icon}
                label={buttons[index].label}
                description={buttons[index].description}
              />
            </animated.div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export function GameModeButton({ className, icon, label, description, onClick = () => {} }) {
  return (
    <Card className={styles['game-mode-container']} onClick={onClick}>
      <div className={classNames(className, styles['game-mode-container'])}>
        <div className={styles['game-mode-icon']}>
          <Icon icon={icon} size="xlarge" />
        </div>
        <h2 className={styles['game-mode-label']}>{label}</h2>
        <div className={styles['game-mode-description']}>{description}</div>
      </div>
    </Card>
  );
}
