import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ACTIONS from '../constants/constants';
import { useAuthContext } from '../hooks/useAuthContext';

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

  const handleRegister = async (e) => {
    e.preventDefault();
    axios.post('/api/users', { firstName, lastName, email, password })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch({ type: ACTIONS.LOGIN, payload: res.data });
        setFormData(intialState);
        navigate('/');    // navigate to main app after sign in
      })
      .catch(err => {
        console.log(err.response.data.err);
        const error = err.response.data.err.split('.')[0];
        setErrorMessage(error);
      });
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
        {errorMessage && <div className='error-message login'>{errorMessage}</div>}
        <button type='submit'>REGISTER</button>
        <div type='button' id='sign-in'><Link to='/login'>Sign in</Link></div>
        <div id='copyright'>Copyright © 2022</div>
        
      </form>
    </main>
  );
};

export default Register;