import React, { useState }  from 'react';
import { useCardsContext } from '../hooks/useCardsContext';
import axios from 'axios';
import moment from 'moment';
import ACTIONS from '../constants/cardsConstant';


const Card = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useCardsContext();

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    console.log('running handleDelte');
    axios.delete(`/api/cards/${card._id}`)
      .then(res => dispatch({ type: ACTIONS.DELETE_CARD, payload: res.data }))
      .catch(err => console.log(err));
  };

  if (isEditing) {
    return (
      <div className="card">
        <div className="cardHeader editting">
          <i className="fa-solid fa-trash" onClick={handleDelete}></i>
          <p onClick={() => setIsEditing(!isEditing)} className="finish-editing">Done</p>
        </div>
        <div className="form-control editing">
          <label htmlFor="question-editing">Question:</label>
          <input 
            id="question-editing" 
            className="questions" 
            name="question-editing" 
            value={card.question}
          />
        </div>
        <div className="form-control editing">
          <label htmlFor="answer-editing">Answer:</label>
          <textarea 
            id="answer-editing" 
            className="answers" 
            name="answer-editing" 
            rows={5} 
            cols={50}
          >
            {card.answer}
          </textarea>
        </div>
        <div className='cardBottom'>
          <span onClick={handleCheck}>
            {!isChecked ? <i className="fa-regular fa-circle-check" ></i> : <i className="fa-solid fa-circle-check checked"></i>}
          </span>
          <span className="date">{moment(card.createdAt).fromNow()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='cardHeader'>
        <p className='showAnswer' onClick={handleShowAnswer}>Check Answer</p>
        <div className='icons'>
          <i className="fa-solid fa-trash" onClick={handleDelete}></i>
          <i className="fa-regular fa-pen-to-square" onClick={handleIsEditing}></i>
        </div>
      </div>
      <p className={showAnswer ? 'answer' : 'question'}>{showAnswer ? card.answer : card.question}</p>
      <div className='cardBottom'>
        <span onClick={handleCheck}>
          {!isChecked ? <i className="fa-regular fa-circle-check" ></i> : <i className="fa-solid fa-circle-check checked"></i>}
        </span>
        <span className="date">{moment(card.createdAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default Card;