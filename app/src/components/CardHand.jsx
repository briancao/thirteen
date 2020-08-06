import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './CardHand.module.css';
import Card from './Card';
import { addSet } from '../redux/playerHand/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hasCard } from '../utils/deck';

const CardHand = ({ cards, set, addSet }) => {
  const [center, setCenter] = useState(0);
  const [handStyle, setHandStyle] = useState({});

  useEffect(() => {
    setCenter(Math.round((cards.length - 1) / 2));
    setHandStyle({
      width: `${80 - Math.round(60 / cards.length)}%`,
    });
  }, [cards]);

  function selectCard(card) {
    addSet(card);
  }

  return (
    <div className={styles.container}>
      <div className={styles.hand} style={handStyle}>
        {cards.map((card, i, c) => {
          let cardPosition = {
            transform: `translate(0, ${
              i < center ? -0.7 * (i - center) : -(0.4 - 0.1 * (i - center))
            }rem) rotate(${i < center ? (i - center) * 4 : (i - center) * 4}deg)`,
          };
          let cardSize = {
            height: '15rem',
          };

          let isSelected = hasCard(card, set)

          let disableClass = {
            [styles.disabled]: isSelected,
          };

          return (
            <div
              key={i}
              className={classNames(styles.card, disableClass)}
              style={cardPosition}
              onClick={() => !isSelected && selectCard(card)}
            >
              <Card card={card} style={cardSize} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({ cards: state.playerHand.cards, set: state.playerHand.set }),
  (dispatch) => bindActionCreators({ addSet }, dispatch),
)(CardHand);
