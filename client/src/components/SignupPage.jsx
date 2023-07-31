import React, { useState } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const auth = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const signup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Password and confirm password should be same");
    } else {
      auth.signup(username, password);
      setFormError("");
    }
  };

  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  /* const handleUsernameChange = (e) => {
    const formattedUsername = e.target.value.trim().toLowerCase();
    setUserName(formattedUsername);
  };

  const handlePasswordChange = (e) => {
    const formattedPassword = e.target.value.replace(/\s/g, '');
    setPassword(formattedPassword);
  }; */
  const handleUsernameChange = (e) => {
    const username = e.target.value.trim();
    setUserName(username);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleConfirmPasswordChange = (e) => {
    const samePassword = e.target.value;
    setConfirmPassword(samePassword);
  };


  return (
    <>
    <div className='container pt-4'>
      <h1 className='text-bold my-2'>Sign Up</h1>
      <div className="row">
      <form 
      className='container-md py-2'
      onSubmit={signup}>

          <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
        <label>Username</label>
        <input 
        className='form-control'
        value={username} onChange={handleUsernameChange} />
        </div>

        <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
        <label>Password</label>
        <input
        className='form-control'
          value={password}
          onChange={handlePasswordChange}
          type="password"
        />
        </div>

        <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
        <label>Confirm Password</label>
        <input
        className='form-control'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
        />
        </div>

        <div className='text-center'>
        <button 
        className="btn btn-danger"
        type="submit">Sign Up</button>
        {auth.signupResponse && auth.signupResponse.status === 400 && (
          <p className='py-2 error'>
            It seems that the username is already taken. Try a different
            one!
          </p>
        )}
        </div>
        {formError && <p className="py-2 mt-2 error">{formError}</p>}
      </form>
      </div>
      </div>
      <br />
    </>
  );
}
