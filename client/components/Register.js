import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <main>
      <form className='form'>
        <h1>Register</h1>
        <div className='form-control'>
          <label htmlFor="email">Email Address</label>
          <input type="text" id='email' name='email' ref={inputRef}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password'/>
        </div>
        <div className='form-control'>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" id='password2' name='password2'/>
        </div>
        <button type='button'>REGISTER</button>
        <div type='button' id='sign-in'><Link to='/'>Sign in</Link></div>
        <div id='copyright'>Copyright © 2022</div>
      </form>
    </main>
  );
};

export default Register;