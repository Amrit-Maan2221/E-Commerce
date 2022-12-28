import { useNavigate } from 'react-router-dom';
import './styles/Auth.scss'

export const EmailVerificationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div id="auth_container">
            <div className="auth_wrapper">
                <h1>Success!</h1>
                <p>
                    Thanks for verifying your email, now you can use all the app's features.
                </p>
                <div className="input-control mt-2">
                    <button onClick={() => navigate('/')} className="input-submit">Go to home page</button>
                </div>
            </div>
        </div>
    );
}