import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import ACTIONS from '../constants/constants';

const Register = () => {
  const inputRef = useRef(null);  // focus on first input field upon mounting
  const intialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  };
  
  const [formData, setFormData] = useState(intialState);
  const { firstName, lastName, email, password, password2 } = formData;
  // const [errorMessage, setErrorMessage] = useState(null);

  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let { user, message } = useSelector(state => state.auth);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // setErrorMessage('Password do not match');
      message = 'Password do not match';
      return;
    }
    const userData = { firstName, lastName, email, password };
    dispatch(register(userData));
    setFormData(intialState);
    navigate('/');    // navigate to main app after register
  };

  return (
    <main>
      <form className='form' onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="form-control name">
          <div id="first-name">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' name='firstName' ref={inputRef} value={firstName} onChange={handleChangeForm}/>
          </div>
          <div id="last-name">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' name='lastName' value={lastName} onChange={handleChangeForm} />
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor="email">Email Address</label>
          <input type="text" id='email' name='email' value={email} onChange={handleChangeForm}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' value={password} onChange={handleChangeForm}/>
        </div>
        <div className='form-control'>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" id='password2' name='password2' value={password2} onChange={handleChangeForm}/>
        </div>
        {message && <div className='error-message login'>{message}</div>}
        <button type='submit'>REGISTER</button>
        <div type='button' id='sign-in'><Link to='/login'>Sign in</Link></div>
        <div id='copyright'>Copyright © 2022</div>
        
      </form>
    </main>
  );
};

export default Register;