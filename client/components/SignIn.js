import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '../hooks/useSignIn';

const SignIn = () => {
  const inputRef = useRef(null);
  const intialState = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(intialState);
  const { email, password } = formData;

  const { signIn, error } = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeForm = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
    setFormData(intialState);
    navigate('/');    // navigate to main app after sign in
  };

  return (
    <main>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className='form-control'>
          <label htmlFor="email">Email Address</label>
          <input type="text" id='email' name='email' ref={inputRef} value={email} onChange={handleChangeForm}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' value={password} onChange={handleChangeForm}/>
        </div>
        <button type='submit'>SIGN IN</button>
        <div type='button' id='register'><Link to='/register'>Don&apos;t have an account? Sign up</Link></div>
        <div id='copyright'>Copyright © 2022</div>
      </form>
    </main>
  );
};

export default SignIn;