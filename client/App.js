import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlashCardsDisplay from './components/FlashCardsDisplay';
import Register from './components/Register';
import SignIn from './components/SignIn';

const App = () => {

  return (
    <>
      <div id="navbar">Flashcard App</div>
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/user' element={<FlashCardsDisplay />}/>
      </Routes>      
    </>
  );
};

export default App;
