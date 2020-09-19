import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.css';
import Icon from './Icon';

export default function Button({
  type = 'button',
  icon,
  size,
  variant,
  children,
  className,
  tooltip,
  tooltipId,
  ...props
}) {
  return (
    <button
      data-effect="solid"
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
      {icon && <Icon icon={icon} size={size} />}
      {children}
    </button>
  );
}
