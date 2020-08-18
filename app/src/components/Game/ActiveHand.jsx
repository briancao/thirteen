import React from 'react';
import styles from './ActiveHand.module.css';
import Card from './Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeActiveHand } from '../../redux/playerHand/actions';

const ActiveHand = ({ cards, opponentCards, removeActiveHand }) => {
  let cardPosition = {
    width: '4rem',
  };
  let cardSize = {
    height: '10rem',
  };

  function removeCard(card) {
    removeActiveHand(card);
  }

  return (
    <div className={styles.container}>
      {cards &&
        cards.map((card, i, c) => {
          return (
            <div
              key={i}
              className={styles.card}
              style={cardPosition}
              onClick={() => removeCard(card)}
            >
              <Card card={card} style={cardSize} />
            </div>
          );
        })}
      {opponentCards > 0 &&
        new Array(opponentCards).fill().map((a, i) => {
          return (
            <div key={i} className={styles.card} style={cardPosition}>
              <Card card={{ name: 'back', suit: '1' }} style={cardSize} />
            </div>
          );
        })}
    </div>
  );
};

export default connect(
  (state) => ({
    cards: state.playerHand.activeHand.cards,
    opponentCards: state.playerHand.opponentHand,
  }),
  (dispatch) => bindActionCreators({ removeActiveHand }, dispatch),
)(ActiveHand);
