import React, { createContext, useEffect, useReducer } from "react";
import { CardsContext } from "./CardsContext";
import ACTIONS from "../constants/constants";

export const AuthContext = createContext();

const intialState = {
  user: null
};

export const authReducer = (state, action) => {
  switch(action.type) {
  case ACTIONS.LOGIN:
    return {
      user: action.payload
    };
  case ACTIONS.LOGOUT:
    return intialState;
  default:
    return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, intialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: ACTIONS.LOGIN, payload: user });
    }
  }, []);
  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};