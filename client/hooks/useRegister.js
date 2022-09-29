/**
 * Custom Hooks
 */

// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
// import axios from "axios";
// import ACTIONS from "../constants/constants";

// export const useRegister = () => {
//   const [isLoading, setIsLoading] = useState(null);
//   const [error, setError] = useState(null);
//   const { dispatch } = useAuthContext();

//   const register = async (firstName, lastName, email, password) => {
//     try {
//       console.log('register a user');
//       const res = await axios.post('/api/users', { firstName, lastName, email, password });

//       localStorage.setItem('user', JSON.stringify(res.data));

//       dispatch({ type: ACTIONS.LOGIN, payload: res.data });

//     } catch (error) {
//       setIsLoading(false);
//       setError(error);
//     }
//   };

//   return { register, isLoading, error };
// };