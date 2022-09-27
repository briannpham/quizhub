import React, { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
import Form from './components/Form';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    fetch('/api/cards/')
      .then(res => res.json())
      .then(data => console.log('fetching cards'))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1 id="heading">Flashcard App</h1>
      <div className="btn-container">
        <button className="show-modal" onClick={() => setShowModal(!showModal)}>
          {!showModal ? 'ADD' : 'CLOSE'}
        </button>
      </div>
      {showModal ? <Form /> : <CardContainer />}
    </div>
  );
};

export default App;