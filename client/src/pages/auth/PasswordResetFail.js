import { useNavigate } from 'react-router-dom';

function PasswordResetFail () {
    const navigate = useNavigate();

    return (
        <div id="auth_container">
            <div className="auth_wrapper">
                <h1>Uh oh...</h1>
                <p>
                    Something went wrong while trying to reset your password.
                </p>
                <div className="input-control mt-2">
                    <button onClick={() => navigate('/login')} className="input-submit">Back to Log in</button>
                </div>
            </div>
        </div>
    );
}



export default PasswordResetFail