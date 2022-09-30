import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ACTIONS from '../constants/constants';
import { useAuthContext } from '../hooks/useAuthContext';

const SignIn = () => {
  const inputRef = useRef(null);  // focus on first input field upon mounting
  const intialState = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(intialState);
  const { email, password } = formData;
  const [errorMessage, setErrorMessage] = useState(null);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  // focus on first input field upon mounting
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeForm = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post('/api/users/login', { email, password })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch({ type: ACTIONS.LOGIN, payload: res.data });
        setFormData(intialState);
        navigate('/');    // navigate to main app after sign in
      })
      .catch(err => {
        const error = err.response.data.err.split('.')[0];
        setErrorMessage(error);
      });
  };

  return (
    <main>
      <form className='form' onSubmit={handleSignIn}>
        <h1>Sign in</h1>
        <div className='form-control'>
          <label htmlFor="email">Email Address</label>
          <input type="text" id='email' name='email' ref={inputRef} value={email} onChange={handleChangeForm}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' value={password} onChange={handleChangeForm}/>
        </div>
        {errorMessage && <div className='error-message login'>{errorMessage}</div>}
        <button type='submit'>SIGN IN</button>
        <div type='button' id='register'><Link to='/register'>Don&apos;t have an account? Sign up</Link></div>
        <div id='copyright'>Copyright © 2022</div>
      </form>
    </main>
  );
};

export default SignIn;