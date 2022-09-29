import React, { useState } from 'react';
import Card from './Card';

const CardContainer = ({ cards }) => {
  const [cardsList, setCardsList] = useState([]);
  const [notReviewed, setNotReviewed] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // let clicked = '';
  const handleClick = (e) => {
    const id = e.target.id;
    if (id === 'not-reviewed') {
      setCardsList(cards.filter(card => card.status !== 'Reviewed'));
      setNotReviewed(true);
      setReviewed(false);
      setFavorite(false);
    } else if (id === 'reviewed') {
      setCardsList(cards.filter(card => card.status === 'Reviewed'));
      setNotReviewed(false);
      setReviewed(true);
      setFavorite(false);
    } else if (id === 'favorite') {
      setCardsList(cards.filter(card => card.favorite === true));
      setNotReviewed(false);
      setReviewed(false);
      setFavorite(true);
    }
  };

  const handleClickAllCards = () => {
    setCardsList([]);
  };

  if (cardsList.length > 0) {
    return (
      <div>
        <h2>Total Cards: {cardsList.length}</h2>
        <div id='categories'>
          <div id='not-reviewed' className={notReviewed ? 'active' : null} onClick={handleClick}>Not Reviewed</div>
          <div id='reviewed' className={reviewed ? 'active' : null}  onClick={handleClick}>Reviewed</div>
          <div id='favorite' className={favorite ? 'active' : null}  onClick={handleClick}>Favorite</div>
          <div id='reset' onClick={handleClickAllCards}>Reset</div>
        </div>
        <div className='cardContainer'>
          {cardsList.map(card => <Card key={card._id} card={card} />)}
        </div>
      </div>
    );
  }

  return (
    <>
      <h2>Total Cards: {cards.length}</h2>
      <div id='categories'>
        <div id='not-reviewed' onClick={handleClick}>Not Reviewed</div>
        <div id='reviewed' onClick={handleClick}>Reviewed</div>
        <div id='favorite' onClick={handleClick}>Favorite</div>
        <div id='reset' onClick={handleClickAllCards}>Reset</div>
      </div>
      <div className='cardContainer'>
        {cards.map(card => <Card key={card._id} card={card}/>)}
      </div>
    </>
  );
};

export default CardContainer;