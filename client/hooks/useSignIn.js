import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import ACTIONS from "../constants/constants";

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    try {
      console.log('user loggin in');
      const res = await axios.post('/api/users/login', { email, password });

      localStorage.setItem('user', JSON.stringify(res.data));

      dispatch({ type: ACTIONS.LOGIN, payload: res.data });

    } catch (error) {
      setError(error);
    }
  };

  return { signIn, error };
};


