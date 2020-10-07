import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './Slider.module.css';

export default function Slider({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={styles.container}>
      <ul className={styles.slides} onClick={() => setCurrentSlide(currentSlide + 1)}>
        {React.Children.map(children, (child, index) => {
          return (
            <Slide key={index} index={index} currentPosition={currentSlide}>
              {child}
            </Slide>
          );
        })}
      </ul>
    </div>
  );
}

export function Slide({ children, index, currentPosition, margin = 300 }) {
  const left = `${margin * (index - currentPosition)}px`;

  const props = useSpring({
    left: left,
    transform: `scale(${index - currentPosition === 0 ? 1 : 0.75})`,
  });

  return (
    <animated.div style={props} className={styles['slide-container']}>
      <div className={styles.slide}>{children}</div>
    </animated.div>
  );
}
