import React from 'react';
import styles from './Card.module.css';
import classNames from 'classnames';

const Card = ({ card, className, style}) => (
  <img
    src={`${process.env.PUBLIC_URL}/cards/${card.name}-${card.suit}.svg`}
    className={classNames(className, styles.card)}
    style={style}
    alt=""
  ></img>
);
export default Card;
