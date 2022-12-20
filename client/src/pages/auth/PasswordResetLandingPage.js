import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { axoisInstance } from "../../util/ApiBaseUrlInstance.js";
import PasswordResetSuccess from './PasswordResetSuccess';
import PasswordResetFail from './PasswordResetFail';

function PasswordResetLandingPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const { passwordResetCode } = useParams();

    const onResetClicked = async () => {
        try {
            await axoisInstance.put(`/users/${passwordResetCode}/reset-password`, { newPassword: passwordValue });
            setIsSuccess(true);
        } catch (e) {
            setIsFailure(true);
        }
    }

    if (isFailure) return <PasswordResetFail />
    if (isSuccess) return <PasswordResetSuccess />

    return (
        <div id="auth_container">
            <div className="auth_wrapper">
                <div className="heading">
                    <h1 className="text text-large">Reset Password</h1>
                    <p className="text text-normal">Please enter a new password</p>
                    <div className='auth-failMsg-Container'>
                        {(passwordValue && confirmPasswordValue && (passwordValue !== confirmPasswordValue) ) && <p className="text text-normal text-fail">Password and Confirm Password do not match</p>}
                    </div>
                </div>
                <div className="auth_form">
                    <div className="input-control">
                        <label htmlFor="password" className="input-label" hidden>Password</label>
                        <input id="password" name="password"
                            type='password' className="input-field"
                            value={passwordValue}
                            onChange={e => setPasswordValue(e.target.value)}
                            placeholder="Password" />

                    </div>
                    <div className="input-control">
                        <label htmlFor="confirmPassword" className="input-label" hidden>Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword"
                            type='password' className="input-field"
                            value={confirmPasswordValue}
                            onChange={e => setConfirmPasswordValue(e.target.value)}
                            placeholder="Confirm Password" />
                    </div>
                    <div className="input-control">
                        <button className="input-submit"
                            disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
                            onClick={onResetClicked}
                        >Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PasswordResetLandingPage