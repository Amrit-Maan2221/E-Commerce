import { useNavigate } from 'react-router-dom';
import './style/Auth.scss'

function PasswordResetSuccess() {
    const navigate = useNavigate();

    return (
        <div id="auth_container">
            <div className="auth_wrapper">
                <h1>Success!</h1>
                <p>
                    Your password has been reset, now please login with your new password.
                </p>
                <div className="input-control mt-2">
                    <button onClick={() => navigate('/login')} className="input-submit">Log in</button>
                </div>
            </div>
        </div>
    );
}




export default PasswordResetSuccess