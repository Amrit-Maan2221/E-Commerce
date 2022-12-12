import React, { useState } from 'react'
import { axoisInstance } from "../util/ApiBaseUrlInstance.js";
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';

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
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.statusText);
    }
  }


  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        placeholder="someone@gmail.com" />
      <input
        placeholder="First Name"
        type="text"
        value={firstNameValue}
        onChange={e => setFirstNameValue(e.target.value)} />
      <input
        placeholder="Last Name"
        type="text"
        value={lastNameValue}
        onChange={e => setLastNameValue(e.target.value)} />
      <input
        placeholder="User Name"
        type="text"
        value={usernameValue}
        onChange={e => setUsernameValue(e.target.value)} />
      <input
        type="Password"
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        placeholder="password" />
      <input
        type="Password"
        value={confirmPasswordValue}
        onChange={e => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm Password" />
      <hr />
      <button
        disabled={
          !emailValue || !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}>Sign Up</button>
      <button onClick={() => navigate('/login')}>Already have an account? Log In</button>
    </div>
  )
}

export default Register