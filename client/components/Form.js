import React, { useState } from "react";

const Form = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSave = () => {
    fetch('/api/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question, answer: answer })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

    setAnswer('');
    setQuestion('');
  };

  return (
    <form>
      <h2>Add Flashcard</h2>
      <div className="form-control">
        <label htmlFor="question">Question:</label>
        <input 
          name="question" 
          id="question" 
          placeholder="Type your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="answer">Answer:</label>
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
      <button type="button" id="save-btn" onClick={handleSave}>Save</button>
      <button type="button" id="close-btn">Close</button>
    </form>
  );
};

export default Form;