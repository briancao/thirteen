import React from 'react';
import { ReactComponent as Hexagon } from '../../assets/hexagon.svg';
import { ReactComponent as Results } from '../../assets/results.svg';
import { ReactComponent as Trophy } from '../../assets/trophy.svg';
import { ReactComponent as Play } from '../../assets/play.svg';
import Navbar, { NavButton, NavContainer } from '../layouts/Navbar';
import styles from './MenuBar.module.css';

export default function MenuBar() {
  return (
    <Navbar>
      <NavContainer>
        <NavButton icon={<Hexagon />} to="/home" />
      </NavContainer>
      <div className={styles.gameContainer}>
        <NavContainer>
          <NavButton icon={<Play />} to="/play" />
          <NavButton icon={<Results />} to={`/profile`} />
          <NavButton icon={<Trophy />} to="/ladder" />
        </NavContainer>
      </div>
    </Navbar>
  );
}
