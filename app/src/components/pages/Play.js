import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { animated, useTrail } from 'react-spring';
import { ReactComponent as Quick } from '../../assets/flash.svg';
import { ReactComponent as Search } from '../../assets/search.svg';
import { ReactComponent as Star } from '../../assets/star.svg';
import Card from './../common/Card';
import Icon from './../common/Icon';
import Page from './../layouts/Page';
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
      onClick: () => {
        history.push('/play/game-browser');
      },
    },
  ];

  const trail = useTrail(buttons.length, {
    opacity: 1,
    transform: 'translateX(0px)',
    from: { opacity: 0, transform: 'translateX(150px)' },
  });

  return (
    <Page>
      <div className="container-fluid fill-height">
        <div className="row align-items-center fill-height">
          {trail.map((props, index) => {
            const { icon, label, description, onClick } = buttons[index];

            return (
              <animated.div key={`button-${index}`} style={props} className="col">
                <GameModeButton
                  icon={icon}
                  label={label}
                  description={description}
                  onClick={onClick}
                />
              </animated.div>
            );
          })}
        </div>
      </div>
    </Page>
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
    <div
      onClick={onClick}
    >
      <Card className={styles['game-mode-container']}>
        <div className={classNames(className, styles['game-mode-container'])}>
          <div className={styles['game-mode-icon']}>
            <Icon icon={icon} size="xlarge" />
          </div>
          <h2 className={styles['game-mode-label']}>{label}</h2>
          <div className={styles['game-mode-description']}>{description}</div>
        </div>
      </Card>
    </div>
  );
}
