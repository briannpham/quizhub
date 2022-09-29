import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  
  return (
    <div id="navbar">
      <div className='logo'>
        <Link to='/'>Flashcard App</Link>
      </div>
      <div>
        {user ? (
          <div>
            <span>{user.firstName} {user.lastName}</span>
            <button className='nav-btn' onClick={() => logout()}>
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