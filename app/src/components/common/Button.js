import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.css';
import Icon from './Icon';

export default function Button({
  type = 'button',
  icon,
  size,
  iconSize,
  variant,
  children,
  className,
  tooltip,
  tooltipId,
  ...props
}) {
  return (
    <button
      type={type}
      className={classNames(styles.button, className, {
        [styles.large]: size === 'large',
        [styles.small]: size === 'small',
        [styles.xsmall]: size === 'xsmall',
        [styles.action]: variant === 'action',
        [styles.danger]: variant === 'danger',
      })}
      {...props}
    >
      {icon && <Icon className={styles.icon} icon={icon} size={iconSize} />}
      {children && <div className={styles.label}>{children}</div>}
    </button>
  );
}
