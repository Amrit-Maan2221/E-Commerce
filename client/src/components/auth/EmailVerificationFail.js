import { useNavigate } from 'react-router-dom';
import './styles/Auth.scss'

function EmailVerificationFail ({message}){
    const navigate = useNavigate();

    return (
        <div id="auth_container">
        <div className="auth_wrapper">
            <h1>Uh oh...</h1>
            <p>
                {(message == "") ? 
                "Something went wrong while trying to verify your email" : `${message}`
                }
            </p>
            <div className="input-control mt-2">
                <button onClick={() => navigate('/register')} className="input-submit">Back to Sign-up</button>
            </div>
        </div>
        </div>
    );
}


export default EmailVerificationFail