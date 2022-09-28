import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <main>
      <form className='form'>
        <h1>Sign in</h1>
        <div className='form-control'>
          <label htmlFor="email">Email Address</label>
          <input type="text" id='email' name='email' ref={inputRef}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password'/>
        </div>
        <button type='submit'>SIGN IN</button>
        <div type='button' id='register'><Link to='/register'>Don&apos;t have an account? Sign up</Link></div>
        <div id='copyright'>Copyright © 2022</div>
      </form>
    </main>
  );
};

export default SignIn;