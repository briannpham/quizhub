import ACTIONS from "../constants/constants";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from local storage and dispatch logout action
    localStorage.removeItem('user');

    dispatch({ type: ACTIONS.LOGOUT });
  };

  return { logout };
};