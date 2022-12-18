import { useNavigate } from 'react-router-dom';

function EmailVerificationFail ({message}){
    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                {(message == "") ? 
                "Something went wrong while trying to verify your email" : `${message}`
                }
            </p>
            <button onClick={() => navigate('/register')}>Back to Sign-up</button>
        </div>
    );
}


export default EmailVerificationFail