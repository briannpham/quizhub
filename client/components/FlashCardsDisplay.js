import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCardsContext } from '../hooks/useCardsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Form from './Form';
import CardContainer from './CardContainer';
import ACTIONS from '../constants/constants';
import { FaPlus } from "react-icons/fa";
const FlashCardsDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const { cards, dispatch } = useCardsContext();
  const { user } = useAuthContext();


  // Loading Flashcards upon opening App
  useEffect(() => {
    console.log('running useEffect'); 
    if (user) {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };
      axios.get('/api/cards', config)
        .then(res => dispatch({ type: ACTIONS.LOAD_CARDS, payload: res.data }))
        .catch(err => console.log(err));
    }
  }, [dispatch, user]);

  if (!user) {
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