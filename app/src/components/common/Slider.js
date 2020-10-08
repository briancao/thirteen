import React, { useState, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './Slider.module.css';

export default function Slider({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const state = useRef({ x: 0 });

  const handleMouseDown = (e) => {
    state.current.x = e.screenX;
  };

  const handleMouseUp = (e) => {
    const { screenX } = e;
    const delta = Math.abs(screenX - state.current.x);

    slide(delta, screenX);
  };

  const handleTouchStart = (e) => {
    state.current.x = e.touches[0].screenX;
  };

  const handleTouchEnd = (e, onClickSlide = () => {}) => {
    const { screenX } = e.changedTouches[0];
    const delta = Math.abs(screenX - state.current.x);

    slide(delta, screenX);
  };

  const handleClick = (e, onClickSlide = () => {}) => {
    const { screenX } = e;
    const delta = Math.abs(screenX - state.current.x);

    if (delta < 10) {
      onClickSlide();
    }
  };

  function slide(delta, screenX) {
    if (delta > 10) {
      if (screenX >= state.current.x && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (screenX <= state.current.x && currentSlide < children.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
  }

  return (
    <div
      className={styles.container}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchEnd={(E) => handleTouchEnd(E)}
    >
      <ul className={styles.slides}>
        {React.Children.map(children, (child, index) => {
          return (
            <Slide key={index} index={index} currentPosition={currentSlide}>
              {React.cloneElement(child, {
                ...child.props,
                onClick: (e) => handleClick(e, child.props.onClick),
              })}
            </Slide>
          );
        })}
      </ul>
    </div>
  );
}

export function Slide({ children, index, currentPosition, margin = 300, onClick }) {
  const left = `${margin * (index - currentPosition)}px`;

  const props = useSpring({
    left: left,
    transform: `scale(${index - currentPosition === 0 ? 1 : 0.75})`,
  });

  return (
    <animated.div style={props} className={styles['slide-container']} onClick={onClick}>
      <div className={styles.slide}>{children}</div>
    </animated.div>
  );
}
