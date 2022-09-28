import React from 'react';

const SignIn = () => {
  return (
    <main>
      <div id='sign-in'>
        <h1>Sign in</h1>
        <form action="#" id='sign-in-form'>
          <div className='form-control'>
            <label htmlFor="email">Email Address</label>
            <input type="text" id='email' name='email'/>
          </div>
          <div className='form-control'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password'/>
          </div>
          <button type='button'>SIGN IN</button>
        </form>
        <div id='copyright'>Copyright © 2022</div>
      </div>
    </main>
  );
};

export default SignIn;