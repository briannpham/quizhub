import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(false);
  return (
    <div id="navbar">
      <div className='logo'>
        <Link to='/'>Flashcard App</Link>
      </div>
      <div>
        {user ? (
          <div>
            <button className='nav-btn'>
              Logout
            </button>
          </div>
        ) : (
          <div className='login-logout'>
            <div>
              <button className='nav-btn'>
                <Link to='/login'>SIGN IN</Link>
              </button>
            </div>
            <div>
              <button className='nav-btn'>
                <Link to='/register'>REGISTER</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;