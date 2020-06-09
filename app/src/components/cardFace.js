import React from 'react';
import image from '../assets/10C.svg';
import style from './cardFace.css';

const suits = ['spade', 'club', 'diamond', 'heart'];
const names = [
  { name: 'two', value: 2,  },
  { name: 'three', value: 3 },
  { name: 'four', value: 4 },
  { name: 'five', value: 5 },
  { name: 'six', value: 6 },
  { name: 'seven', value: 7 },
  { name: 'eight', value: 8 },
  { name: 'nine', value: 9 },
  { name: 'ten', value: 10 },
  { name: 'jack', value: 11 },
  { name: 'queen', value: 12 },
  { name: 'king', value: 13 },
  { name: 'ace', value: 14 },
];

const CardFace = (props) => {
  return  <img src={`../assets/${props.value}C.svg`} alt="" />;;
};

export default CardFace;
