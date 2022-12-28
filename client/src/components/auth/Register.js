import React, { useState } from 'react'
import { axoisInstance } from "../../util/ApiBaseUrlInstance.js";
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../custom hooks/useToken';
import { Link } from "react-router-dom";
import './styles/Auth.scss'

function Register() {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");


  const navigate = useNavigate();


  const onSignUpClicked = async () => {
    const options = {
      method: 'POST',
      url: '/signup',
      data: {
        firstname: firstNameValue,
        lastname: lastNameValue,
        username: usernameValue,
        email: emailValue,
        password: passwordValue
      }
    };
    try {
      const response = await axoisInstance.request(options);
      console.log(response)
      const token = response.data;
      console.log(token);
      setToken(token);
      navigate("/verify-your-email");
    } catch (err) {
      setErrorMessage(err.response.statusText);
    }
  }


  return (
    <div id="auth_container">
      <div className="auth_wrapper">
        <div className="heading">
          <h1 className="text text-large">Sign Up</h1>
          <p className="text text-normal">Already have an account? <span><Link to='/login' className="text text-links">Log In</Link></span></p>
          <div className='auth-failMsg-Container'>
            {errorMessage && <p className="text text-normal text-fail">{errorMessage}</p>}
          </div>
        </div>
        <div className="auth_form">
          <div className="input-control">
            <label htmlFor="email" className="input-label" hidden>Email Address</label>
            <input id="email" name="email"
              value={emailValue} className="input-field"
              onChange={e => setEmailValue(e.target.value)}
              placeholder="someone@gmail.com" />
          </div>

          <div className="input-control">
            <label htmlFor="firstName" className="input-label" hidden>First Name</label>
            <input id="firstName" name="firstName"
              placeholder="First Name"
              type="text" className="input-field"
              value={firstNameValue}
              onChange={e => setFirstNameValue(e.target.value)} />
          </div>

          <div className="input-control">
            <label htmlFor="lastName" className="input-label" hidden>Last Name</label>
            <input id="lastName" name="lastName"
              placeholder="Last Name"
              type="text" className="input-field"
              value={lastNameValue}
              onChange={e => setLastNameValue(e.target.value)} />
          </div>
          <div className="input-control">
            <label htmlFor="userName" className="input-label" hidden>User Name</label>
            <input id="userName" name="userName"
              placeholder="User Name"
              type="text" className="input-field"
              value={usernameValue}
              onChange={e => setUsernameValue(e.target.value)} />
          </div>
          <div className="input-control">
            <label htmlFor="password" className="input-label" hidden>Password</label>
            <input id="password" name="password"
              type="Password" className="input-field"
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              placeholder="password" />
          </div>
          <div className="input-control">
            <label htmlFor="confirmPassword" className="input-label" hidden>Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword"
              type="Password" className="input-field"
              value={confirmPasswordValue}
              onChange={e => setConfirmPasswordValue(e.target.value)}
              placeholder="Confirm Password" />
          </div>
          <hr />
          <div className="input-control">
            <button className="input-submit"
              disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue}
              onClick={onSignUpClicked}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register