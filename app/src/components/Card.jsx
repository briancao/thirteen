import React from 'react';
import styles from './Card.module.css';
import classNames from 'classnames';

const Card = ({ name, suit, className}) => (
  <img
    src={`${process.env.PUBLIC_URL}/cards/${name}-${suit}.svg`}
    className={classNames(className, styles.card)}
    alt=""
  ></img>
);
export default Card;
