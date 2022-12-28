import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axoisInstance } from "../../util/ApiBaseUrlInstance.js";
import { useToken } from '../../custom hooks/useToken';
import { Link } from "react-router-dom";
import './styles/Auth.scss'

function Login() {
  const [token, setToken] = useToken();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  

  const onLogInClicked = async (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      url: '/login',
      data: {
        email: emailValue,
        password: passwordValue
      }
    };
    try {
      const response = await axoisInstance.request(options);
      const token = response.data;
      console.log(token);
      setToken(token);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }

  return (
    <>
    <div id="auth_container">
      <div className="auth_wrapper">
        <div className="heading">
          <h1 className="text text-large">Sign In</h1>
          <p className="text text-normal">New user? <span><Link to='/register' className="text text-links">Create an account</Link></span>
          </p>
          <div className='auth-failMsg-Container'>
            {errorMessage && <p className="text text-normal text-fail">{errorMessage}</p>}
          </div>
        </div>
        <div className="auth_form">
          <div className="input-control">
            <label htmlFor="email" className="input-label" hidden>Email Address</label>
            <input id="email" name="email"
              placeholder="someone@gmail.com" className="input-field" 
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)} />
          </div>
          <div className="input-control">
            <label htmlFor="password" className="input-label" hidden>Password</label>
            <input name="password"
              placeholder="Password" id="password" className="input-field"
              type={shouldShowPassword ? "text" : "password"}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)} />
          </div>
          
          <div className="login-showpwd text text-links" onClick={() => setShouldShowPassword(!shouldShowPassword)}>
          { passwordValue !== "" ? "Show Password" : "" }</div>
          
          <div className="input-control">
              <Link to="/forgot-password" className="text text-links">Forgot Password</Link>
              <button disabled={!emailValue || !passwordValue}
            onClick={onLogInClicked} className="input-submit" >Log In</button>
          </div>
        </div>
        {/* **********************************************************************
        *************Styling if you want add OAuth******************************
        *********************************************************************
        <div className="striped">
                        <span className="striped-line"></span>
                        <span className="striped-text">Or</span>
                        <span className="striped-line"></span>
                    </div>
                    <div className="method">
                        <div className="method-control">
                            <a href="#" className="method-action">
                                <i className="ion ion-logo-google"></i>
                                <span>Sign in with Google</span>
                            </a>
                        </div>
                        <div className="method-control">
                            <a href="#" className="method-action">
                                <i className="ion ion-logo-facebook"></i>
                                <span>Sign in with Facebook</span>
                            </a>
                        </div>
                        <div className="method-control">
                            <a href="#" className="method-action">
                                <i className="ion ion-logo-apple"></i>
                                <span>Sign in with Apple</span>
                            </a>
                        </div>
                    </div> */}
      </div>
    </div>
    </>
  )
}

export default Login