import React from 'react';
import classNames from 'classnames';
import styles from './Navbar.module.css';
import Icon from './../common/Icon';
import { NavLink  } from 'react-router-dom';

export default function Navbar({ className, children }) {
  return (
    <div>
      <div className={classNames(styles.navBackground, className)} />
      <div className={classNames(styles.nav, className)}>{children}</div>
    </div>
  );
}

export function NavContainer({ className, children }) {
  return <div className={classNames(styles.navContainer, className)}>{children}</div>;
}

export function NavButton({ className, label, icon, to, isActive, type = 'button', size = 'small' }) {
  return (
    <div className={styles.navButtonContainer}>
      <NavLink  to={to} activeClassName={styles.selected} isActive={isActive}>
        <button type={type} className={classNames(styles.navButton, className)}>
          {icon && <Icon icon={icon} size={size} />}
        </button>
        {label && <div className={styles.navLabel}>{label}</div>}
      </NavLink >
    </div>
  );
}
