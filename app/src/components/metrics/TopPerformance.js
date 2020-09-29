import React from 'react';
import styles from './TopPerformance.module.css';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';
import Icon from './../common/Icon';
import { ReactComponent as User } from '../../assets/user.svg';

export default function TopPerformance({ data, className }) {
  return (
    <div className={classNames(styles.container, className)}>
      {data.map((a, i) => {
        return (
          <div key={i} className={styles.game}>
            <div className={styles.icon}>
              <Icon icon={<User />} size="xsmall" />
            </div>
            <div className={classNames(styles.result, {[styles.lose]: a.result === 'L'})}>{a.result}</div>
            <div className={styles.barContainer}>
              <WinBar placement={a.placement} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WinBar({ placement, classname }) {
  const props = useSpring({ height: '100%', from: { height: '0%' } });
  return (
    <animated.div className={classNames(styles.bar, classname)} style={props}>
      <div
        className={classNames(styles.barFill, {
          [styles.first]: placement === 1,
          [styles.second]: placement === 2,
          [styles.third]: placement === 3,
          [styles.fourth]: placement === 4,
        })}
      ></div>
    </animated.div>
  );
}
