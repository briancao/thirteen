import React from 'react';
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as User } from '../assets/user.svg';
import { ReactComponent as Statistics } from '../assets/statistics.svg';
import Navbar, { NavContainer, NavItem } from './../components/layouts/Navbar';
import Page from './../components/layouts/Page';

export default function Home() {
  return (
    <Page>
      <Navbar>
        <NavContainer>
          <NavItem icon={<User />} />
        </NavContainer>
        <NavContainer>
          <NavItem icon={<Play />} />
          <NavItem icon={<Statistics />} />
        </NavContainer>
      </Navbar>
    </Page>
  );
}
