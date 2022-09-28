import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const inputRef = useRef(null);      // use to focus on first input box upon mounting
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, password, password2 } = formData;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeForm = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <button type='submit'>REGISTER</button>
        <div type='button' id='sign-in'><Link to='/login'>Sign in</Link></div>
        <div id='copyright'>Copyright © 2022</div>
      </form>
    </main>
  );
};

export default Register;