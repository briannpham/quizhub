import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useLogout } from '../hooks/useLogout';
// import { useAuthContext } from '../hooks/useAuthContext';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  // const { user } = useAuthContext();
  // const { logout } = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    // logout();
    dispatch(logout());
    dispatch(reset());
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
            <span id='user'>Hello, {user.firstName}</span>
            <button className='nav-btn' onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        ) : (
          <div className='login-logout'>
            <div>
              <Link to='/login'>
                <button className='nav-btn'>SIGN IN</button>
              </Link>
            </div>
            <div>
              <Link to='/register'>
                <button className='nav-btn'>REGISTER</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;