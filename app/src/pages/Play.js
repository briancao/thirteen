import React from 'react';
import Page from './../components/layouts/Page';
import MenuBar from '../components/common/MenuBar';
import styles from './Play.module.css';
import classNames from 'classnames';
import GameModeButton from './../components/domain/play/GameModeButton';
import { ReactComponent as Quick } from '../assets/flash.svg';
import { ReactComponent as Star } from '../assets/star.svg';
import { ReactComponent as Search } from '../assets/search.svg';
import { useTrail, animated } from 'react-spring';

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
      <MenuBar />
      <div className="container-fluid fill-height">
        <div className="row align-items-center fill-height">
          {trail.map((props, index) => (
            <animated.div key={`button-${index}`} style={props} className="col-4">
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
