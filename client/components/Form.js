import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
// import { useCardsContext } from "../hooks/useCardsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useSelector, useDispatch } from "react-redux";
import { createCard } from "../features/cards/cardsSlice";
import ACTIONS from "../constants/constants";

const Form = ({ showModal, setShowModal }) => {
  // const { dispatch } = useCardsContext();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  // const [errorMessage, setErrorMessage] = useState(null);
  const questionRef = useRef(null);

  // const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.cards);

  useEffect(() => {
    questionRef.current.focus();
  }, []);

  const handleSave = () => {
    const cardData = { question, answer };

    dispatch(createCard(cardData));
    setQuestion('');
    setAnswer('');
    setShowModal(false);
  };

  return (
    <form id='add-card-form'>
      <h2>Add Flashcard</h2>
      <div className="form-control">
        <label htmlFor="question">Question/Front:</label>
        <input 
          name="question" 
          id="question" 
          placeholder="Type your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          ref={questionRef}
        />
      </div>
      <div className="form-control">
        <label htmlFor="answer">Answer/Back:</label>
        <textarea 
          id="answer" 
          name="answer" 
          rows={5} 
          cols={50} 
          placeholder="Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        >
        </textarea>
      </div>
      {message && <div className="error-message">{message}</div>}
      <button type="button" id="save-btn" onClick={handleSave}>Save</button>
      <button type="button" id="close-btn" onClick={() => setShowModal(false)}>Close</button>
    </form>
  );
};

export default Form;