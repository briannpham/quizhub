import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import ACTIONS from '../constants/constants';

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: ACTIONS.LOGOUT });
    navigate('/login');
  };
  
  return (
    <div id="navbar">
      <div className='logo'>
        <Link to='/'>Flashcard.io</Link>
      </div>
      <div>
        {user ? (
          <div>
            <span id='user'>Welcome, {user.firstName}</span>
            <button className='nav-btn' onClick={handleLogout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className='login-logout'>
            <div>
              <Link to='/login'>
                <button className='nav-btn'>Log in</button>
              </Link>
            </div>
            <div>
              <Link to='/register'>
                <button className='nav-btn'>Sign up</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;