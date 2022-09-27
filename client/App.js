import React, { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
import { useCardsContext } from './hooks/useCardsContext';
import Form from './components/Form';
import axios from 'axios';
import ACTIONS from './constants/cardsConstant';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const { cards, dispatch } = useCardsContext();
  // console.log('rerender')

  // Loading Flashcards upon opening App
  useEffect(() => {
    console.log('running useEffect');
    axios.get('/api/cards')
      .then(res => dispatch({ type: ACTIONS.LOAD_CARDS, payload: res.data }))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1 id="heading">Flashcard App</h1>
      {/* <div className="btn-container">
        <button className="show-modal" onClick={() => setShowModal(!showModal)}>
          {!showModal ? 'ADD' : 'CLOSE'}
        </button>
      </div> */}
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
  );
};

export default App;