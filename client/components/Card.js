import React, { useState }  from 'react';
import axios from 'axios';
import moment from 'moment';
import ACTIONS from '../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { updateCard, deleteCard, reset } from '../features/cards/cardsSlice';


const Card = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.auth);


  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${user.token}`
  //   }
  // };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleUpdate = () => {
    setIsEditing(prevState => !prevState);  // another way of using setIsEditting(!isEditting)
    const cardData = {
      _id: card._id,
      question,
      answer
    };
    dispatch(updateCard(cardData));
  };

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  const handleCancel = () => {
    setQuestion(card.question);
    setAnswer(card.answer);
    setIsEditing(!isEditing);
  };

  const handleFavorite = () => {
    axios.patch(`/api/cards/${card._id}`, {
      ...card,
      favorite: !card.favorite,
    }, config)
      .then(res => dispatch({ type: ACTIONS.UPDATE_CARD, payload: res.data }))
      .catch(err => console.log(err));
  };

  const handleStatus = () => {
    const newStatus = card.status === "Not Reviewed" ? "Reviewed" : "Not Reviewed";
    axios.patch(`/api/cards/${card._id}`, {
      ...card,
      status: newStatus,
    }, config)
      .then(res => dispatch({ type: ACTIONS.UPDATE_CARD, payload: res.data }))
      .catch(err => console.log(err));
  };

  if (isEditing) {
    return (
      <div className="card">
        <div className="cardHeader editing">
          <i className="fa-solid fa-trash" onClick={handleDelete}></i>
          <div>
            <p onClick={handleUpdate} className="finish-editing">Update</p>
            <p onClick={handleCancel} className="finish-editing">Cancel</p>
          </div>
        </div>
        <div className="form-control editing">
          <label htmlFor="question-editing">Question/Front:</label>
          <input 
            id="question-editing" 
            className="questions" 
            name="question-editing" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="form-control editing">
          <label htmlFor="answer-editing">Answer/Back:</label>
          <textarea 
            id="answer-editing" 
            className="answers" 
            name="answer-editing" 
            rows={5} 
            cols={50}
            onChange={(e) => setAnswer(e.target.value)}
          >
            {answer}
          </textarea>
        </div>
        <div className='cardBottom editing'>
          <div className='bottom-icons'>
            <span onClick={handleFavorite}>
              {card.favorite ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
            </span>
            <span onClick={handleStatus}>
              {card.status === "Not Reviewed" ? <i className="fa-regular fa-circle-check" ></i> : <i className="fa-solid fa-circle-check checked"></i>}
            </span>
          </div>
          <span className="date">{moment(card.createdAt).fromNow()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='cardHeader'>
        <p className='showAnswer' onClick={handleShowAnswer}>Check Answer</p>
        <div className='top-icons'>
          <i className="fa-solid fa-trash" onClick={handleDelete}></i>
          <i className="fa-regular fa-pen-to-square" onClick={() => setIsEditing(!isEditing)}></i>
        </div>
      </div>
      <p className={showAnswer ? 'answer' : 'question'}>{showAnswer ? card.answer : card.question}</p>
      <div className='cardBottom'>
        <div className='bottom-icons'>
          <span onClick={handleFavorite}>
            {card.favorite ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
          </span>
          <span onClick={handleStatus}>
            {card.status === "Not Reviewed" ? <i className="fa-regular fa-circle-check" ></i> : <i className="fa-solid fa-circle-check"></i>}
          </span>
        </div>
        <span className="date">{moment(card.createdAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default Card;