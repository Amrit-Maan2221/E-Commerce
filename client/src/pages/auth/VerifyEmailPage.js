import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyEmailPage() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <div id="auth_container">
            <div className="auth_wrapper">
            <h1>Thanks for Signing Up!</h1>
            <p>
                A verification email has been sent to the email address you provided.
                Please verify your email to unlock full site features.
            </p>
            </div>
        </div>
    )
}

export default VerifyEmailPage