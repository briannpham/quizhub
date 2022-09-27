import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CardsContextProvider } from './context/CardsContext';
import './index.css';


render(
  <React.StrictMode>
    <CardsContextProvider>
      <App />
    </CardsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
