import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
  const inputRef = useRef(null);      // use to focus on first input box upon mounting
  const intialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  };
  
  const [formData, setFormData] = useState(intialState);
  const { firstName, lastName, email, password, password2 } = formData;
  const { register, isLoading, error } = useRegister();

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
    await register(firstName, lastName, email, password);
    setFormData(intialState);
  };

  return (
    <main>
      <form className='form' onSubmit={handleSubmit}>
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
        <button type='submit' disabled={isLoading}>REGISTER</button>
        <div type='button' id='sign-in'><Link to='/login'>Sign in</Link></div>
        <div id='copyright'>Copyright © 2022</div>
        {error && <div>{error}</div>}
      </form>
    </main>
  );
};

export default Register;