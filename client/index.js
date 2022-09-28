import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CardsContextProvider } from './context/CardsContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


render(
  <React.StrictMode>
    <CardsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CardsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
