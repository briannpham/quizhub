import React from 'react';
import Card from './Card';
// import { cards } from '../data/card-data';

const CardContainer = ({ cards }) => {
  console.log('rerender');
  console.log(cards);
  return (
    <div className='cardContainer'>
      {cards.map(card => <Card key={card._id} card={card}/>)}
    </div>
  );
};

export default CardContainer;