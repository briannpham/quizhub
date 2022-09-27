import React, { useState }  from 'react';

const Card = ({ card, handleDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const id = card._id;

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  

  if (isEditing) {
    return (
      <div className="card">
        <div className="cardHeader">
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
        <div className='cardButtons'>
          <span onClick={handleCheck}>
            {!isChecked ? <i className="fa-regular fa-circle-check" ></i> : <i className="fa-solid fa-circle-check checked"></i>}
          </span>
          <i className="fa-solid fa-trash" onClick={() => handleDelete(id)}></i>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='cardHeader'>
        <p className='showAnswer' onClick={handleShowAnswer}>Check Answer</p>
        <i className="fa-regular fa-pen-to-square" onClick={handleIsEditing}></i>
        {/* <i class="fa-solid fa-ellipsis"></i> */}
      </div>
      <p className={showAnswer ? 'answer' : 'question'}>{showAnswer ? card.answer : card.question}</p>
      {/* {showAnswer ? <p className='answer'>{answer}</p> : <p className='question'>{question}</p>} */}
      <div className='cardButtons'>
        <span onClick={handleCheck}>
          {!isChecked ? <i className="fa-regular fa-circle-check" ></i> : <i className="fa-solid fa-circle-check checked"></i>}
        </span>
        <i className="fa-solid fa-trash" onClick={() => handleDelete(id)}></i>
      </div>
    </div>
  );
};

export default Card;