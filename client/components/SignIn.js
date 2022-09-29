import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import ACTIONS from '../constants/constants';

const SignIn = () => {
  const inputRef = useRef(null);  // focus on first input field upon mounting
  const intialState = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(intialState);
  const { email, password } = formData;
  // const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, message } = useSelector(state => state.auth);

  // focus on first input field upon mounting
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }

  //   dispatch(reset());
  // }, [user, errorMessage, navigate, dispatch]);

  const handleChangeForm = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData));
    setFormData(intialState);
    navigate('/');    // navigate to main app after sign in
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
        {message && <div className='error-message login'>{message}</div>}
        <button type='submit'>SIGN IN</button>
        <div type='button' id='register'><Link to='/register'>Don&apos;t have an account? Sign up</Link></div>
        <div id='copyright'>Copyright © 2022</div>
      </form>
    </main>
  );
};

export default SignIn;