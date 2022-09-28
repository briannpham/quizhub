import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlashCardsDisplay from './components/FlashCardsDisplay';
import Navbar from './components/Navbar';
import Register from './components/Register';
import SignIn from './components/SignIn';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<FlashCardsDisplay />}/>
        <Route path='/login' element={<SignIn />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>      
    </>
  );
};

export default App;
