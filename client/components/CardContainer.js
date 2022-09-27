import React from 'react';
import Card from './Card';
import { cards } from '../data/card-data';

const CardContainer = () => {
  
  return (
    <div className='cardContainer'>
      {cards.map(card => <Card key={card.id} question={card.question} answer={card.answer}/>)}
    </div>
  );
};

export default CardContainer;