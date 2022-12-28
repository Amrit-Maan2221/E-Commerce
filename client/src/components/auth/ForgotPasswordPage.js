import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axoisInstance } from "../../util/ApiBaseUrlInstance.js";
import { Link } from "react-router-dom";
import './styles/Auth.scss'

function ForgotPasswordPage() {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const navigate = useNavigate();

    const onSubmitClicked = async () => {
        try {
            await axoisInstance.put(`/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div id="auth_container">
            <div className="auth_wrapper">
                <div className="heading">
                    <h1 className="text text-large">Forgot Password</h1>
                    <p className="text text-normal">You remember your password? <span><Link to='/login' className="text text-links">Log In</Link></span></p>
                    <p className="text text-normal">Enter your email and we'll send you a reset link</p>

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
                        <button className="input-submit"
                            disabled={!emailValue}
                            onClick={onSubmitClicked}
                        >Send Reset Link</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ForgotPasswordPage