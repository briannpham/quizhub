import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { CardsContextProvider } from './context/CardsContext';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


render(
  <React.StrictMode>
    <AuthContextProvider>
      <CardsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CardsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
