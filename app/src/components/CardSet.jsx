import React from 'react';
import styles from './CardSet.module.css';
import Card from './Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeSet } from '../redux/playerHand/actions';

const CardSet = ({ cards, removeSet }) => {
  function removeCard(card) {
    removeSet(card);
  }

  return (
    <div className={styles.container}>
      {cards &&
        cards.map((card, i, c) => {
          let cardPosition = {
            width: '4rem',
          };
          let cardSize = {
            height: '10rem',
          };

          return (
            <div key={i} className={styles.card} style={cardPosition} onClick={() => removeCard(card)}>
              <Card card={card} style={cardSize} />
            </div>
          );
        })}
    </div>
  );
};

export default connect(
  (state) => ({
    cards: state.playerHand.set,
  }),
  (dispatch) => bindActionCreators({ removeSet }, dispatch),
)(CardSet);
