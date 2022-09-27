import React from 'react';
import Card from './Card';
// import { cards } from '../data/card-data';

const CardContainer = ({ cards, handleDelete }) => {
  console.log('rerender');
  console.log(cards);
  return (
    <div className='cardContainer'>
      {cards.map(card => <Card key={card._id} card={card} handleDelete={handleDelete}/>)}
    </div>
  );
};

export default CardContainer;