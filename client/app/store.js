import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from '../features/cards/cardsSlice';
import authReducer from '../features/auth/authSlice';


export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer
  }
});