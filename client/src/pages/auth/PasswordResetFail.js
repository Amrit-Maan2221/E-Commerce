import { useNavigate } from 'react-router-dom';

function PasswordResetFail () {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while trying to reset your password.
            </p>
            <button onClick={() => navigate('/login')}>Back to Log in</button>
        </div>
    );
}



export default PasswordResetFail