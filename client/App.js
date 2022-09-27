import React, { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
import Form from './components/Form';
import axios from 'axios';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState([]);
  // console.log('rerender')

  useEffect(() => {
    console.log('running useEffect');
    axios.get('/api/cards')
      .then(res => setCards(res.data))
      .catch(err => console.log(err));
  }, [showModal]);

  const handleDelete = (id) => {
    console.log('running handleDelte');
    axios.delete(`/api/cards/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1 id="heading">Flashcard App</h1>
      <div className="btn-container">
        <button className="show-modal" onClick={() => setShowModal(!showModal)}>
          {!showModal ? 'ADD' : 'CLOSE'}
        </button>
      </div>
      {showModal ? <Form showModal={showModal} setShowModal={setShowModal}/> : <CardContainer cards={cards} handleDelete={handleDelete}/>}
    </div>
  );
};

export default App;