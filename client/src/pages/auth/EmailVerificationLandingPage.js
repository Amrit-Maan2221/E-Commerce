import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axoisInstance } from "../../util/ApiBaseUrlInstance.js";
import { useToken } from '../../auth/useToken';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import EmailVerificationFail  from './EmailVerificationFail';
import Loader from '../../components/Loader.js';

function EmailVerificationLandingPage () {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [,setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadVerification = async () => {
            const options = {
                method: 'PUT',
                url: '/verify-email',
                data: {verificationString: verificationString }
              };
            try {
                const response = await axoisInstance.request(options);
                setToken(response.data);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (e) { 
                setErrorMessage(e.response.data.message);
                setIsSuccess(false);
                setIsLoading(false);
            }
        }

        loadVerification();
    }, [verificationString]);

    if (isLoading) return <Loader/>;
    if (!isSuccess) return <EmailVerificationFail message={`${errorMessage}`} />
    return <EmailVerificationSuccess />
}


export default EmailVerificationLandingPage