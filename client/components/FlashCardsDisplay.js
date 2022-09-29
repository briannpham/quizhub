import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import CardContainer from './CardContainer';
import ACTIONS from '../constants/constants';
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { loadCards, reset } from '../features/cards/cardsSlice';


const FlashCardsDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user, message } = useSelector(state => state.auth);
  const { cards } = useSelector(state => state.cards);
  console.log('card display')
  console.log(message)
  console.log(user);
  console.log(cards)

  // Loading Flashcards upon opening App
  useEffect(() => {
    console.log('running useEffect'); 
    dispatch(loadCards());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  if (!localStorage.getItem('user')) {
    return (
      <h1 id="welcome">Welcome</h1>
    );
  }

  return (
    <div>
      <div className='container'>
        {showModal ? <Form showModal={showModal} setShowModal={setShowModal}/>
          :
          <div>
            <div className="btn-container">
              <button className="show-modal" onClick={() => setShowModal(!showModal)}>
                <FaPlus className='add-card' />
              </button>
            </div> 
            <div>
              <h2>Total Cards: {cards.lenth}</h2>
              <CardContainer cards={cards}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default FlashCardsDisplay;