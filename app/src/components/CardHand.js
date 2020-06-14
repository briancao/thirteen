import React from 'react';
import styles from './CardHand.module.css';
import Card from './Card';

const CardHand = ({ cards }) => {
  let center = Math.round((cards.length - 1) / 2);

  return (
    <div className={styles.container}>
      {cards.map((a, i, c) => {
        let cardPosition = {
          width: '5rem',
          'transformOrigin': 'center',
          transform: `translate(0, ${i < center ? (4-(1*i) ) : -(4-(.4*i))}em) rotate(${i < center ? (i - center) * 4 : (i - center) * 4}deg)`,
        };
        console.log(i < center ? true : false);

        return (
          <div key={i} style={cardPosition}>
            <Card name={a.name} suit={a.suit} />
          </div>
        );
      })}
    </div>
  );
};

export default CardHand;
