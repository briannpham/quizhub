import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCardsContext } from '../hooks/useCardsContext';
import Form from './Form';
import CardContainer from './CardContainer';
import ACTIONS from '../constants/cardsConstant';

const FlashCardsDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const { cards, dispatch } = useCardsContext();

  // Loading Flashcards upon opening App
  useEffect(() => {
    console.log('running useEffect');
    axios.get('/api/cards')
      .then(res => dispatch({ type: ACTIONS.LOAD_CARDS, payload: res.data }))
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <div className='container'>
        {showModal ? <Form showModal={showModal} setShowModal={setShowModal}/>
          :
          <div>
            <div className="btn-container">
              <button className="show-modal" onClick={() => setShowModal(!showModal)}>
              ADD
              </button>
            </div> 
            <div>
              <h2>Total Cards: {cards.length}</h2>
              <CardContainer cards={cards}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default FlashCardsDisplay;