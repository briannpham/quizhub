// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
// import axios from "axios";
// import ACTIONS from "../constants/constants";

// export const useSignIn = () => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const { dispatch } = useAuthContext();

//   const signIn = async (email, password) => {
//     try {
//       console.log('user loggin in');
//       const res = await axios.post('/api/users/login', { email, password });

//       localStorage.setItem('user', JSON.stringify(res.data));

//       dispatch({ type: ACTIONS.LOGIN, payload: res.data });

//     } catch (error) {
//       console.log('error')
//       // console.log(error.response.data.err);
//       setErrorMessage(error.response.data.err);
//       console.log(errorMessage)
//     }
//   };

//   return { signIn, errorMessage };
// };


