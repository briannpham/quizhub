import React, { createContext, useReducer } from "react";
import ACTIONS from "../constants/cardsConstant";


export const CardsContext = createContext();
const intialState = {
  cards: []
};

export const cardsReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.LOAD_CARDS:
    return {
      cards: action.payload
    };
  case ACTIONS.CREATE_CARD:
    return {
      cards: [action.payload, ...state.cards]
    };
  case ACTIONS.UPDATE_CARD: 
    const newCards = state.cards.map(card => {
      if (card._id === action.payload._id) {
        return {
          ...card,
          question: action.payload.question,
          answer: action.payload.answer
        };
      } else {
        return card;
      }
    });
    return {
      cards: newCards
    };
  case ACTIONS.DELETE_CARD:
    return {
      cards: state.cards.filter(card => card._id !== action.payload._id)
    };
  default:
    return state;
  }
};

export const CardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardsReducer, intialState);

  return (
    <CardsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CardsContext.Provider>
  );
};