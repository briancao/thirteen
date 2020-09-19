import React from 'react';
import classNames from 'classnames';
import styles from './Navbar.module.css';
import Icon from './../common/Icon';

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

export function NavItem({ className, children, label, icon, size = 'small' }) {
  return (
    <div className={classNames(styles.navItem, className)}>
      <div className={styles.navItemOutline} />
      {icon && <Icon icon={icon} size={size} />}
      {label && <div className={styles.navLabel}>{label}</div>}
      {children}
    </div>
  );
}
