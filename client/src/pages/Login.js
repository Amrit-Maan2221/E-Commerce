import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
//import axios from 'axios';
//import { useToken } from '../auth/useToken';

function Login() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const onLogInClicked = async () => {
        alert('Log in not implemented yet');
    }

    return (
        <div className="container">
            <h1>Log In</h1>
            {errorMessage && <div>{errorMessage}</div>}
            <input
                placeholder="someone@gmail.com"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)} />
            <input
                placeholder="Password"
                type={shouldShowPassword ? "text" : "password"}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)} />
            <button onClick={() => setShouldShowPassword(!shouldShowPassword)}>Show Password</button>
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>Log In</button>
            <button onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
            <button onClick={() => navigate('/register')}>Don't have an account? Sign up</button>
        </div>
    )
}

export default Login