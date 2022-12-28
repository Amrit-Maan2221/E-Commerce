import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { axoisInstance } from "../../util/ApiBaseUrlInstance.js";
import { useToken } from '../../custom hooks/useToken';
import { useUser } from '../../custom hooks/useUser';
import './styles/UserInfo.scss'

function UserInfo() {
    const user = useUser();
    const [token, setToken] = useToken();
    console.log(user);
    const { firstname, lastname, username, email, _id, isVerified } = user;
    const navigate = useNavigate();

    const [firstNameValue, setFirstNameValue] = useState(firstname || "");
    const [emailValue, setEmailValue] = useState(email || '');
    const [lastNameValue, setLastNameValue] = useState(lastname || "");
    const [usernameValue, setUsernameValue] = useState(username || "");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        const options = {
            method: 'PUT',
            url: `/users/${_id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                firstname: firstNameValue,
                lastname: lastNameValue,
                username: usernameValue
            }
        };
        try {
            const response = await axoisInstance.request(options);
            console.log(response);
            const token = response.data;
            console.log(token);
            setToken(token);
            setShowSuccessMessage(true);
        } catch (err) {
            console.log(err)
            setShowErrorMessage(true);
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const resetValues = () => {
        // Reset the text input values to their starting values (the data we loaded from the server)
        setFirstNameValue(firstname);
        setLastNameValue(lastname);
        setUsernameValue(username);
    }




    return (
        <section id="profile_container">
            <div className="profile_wrapper">
                <div className="heading">
                    <h1 className="text text-large">Info for {emailValue}</h1>
                    {!isVerified && <p className="fail">You won't be able to make any changes until you verify your email</p>}
                    {showSuccessMessage && <p>Successfully saved user data!</p>}
                    {showErrorMessage && <p className="fail">Uh oh... something went wrong and we couldn't save changes</p>}
                </div>
                <div className="profile_form">
                    <label>
                        First Name:
                        <input
                            onChange={e => setFirstNameValue(e.target.value)}
                            value={firstNameValue} />
                    </label>
                    <label>
                        Last Name:
                        <input
                            onChange={e => setLastNameValue(e.target.value)}
                            value={lastNameValue} />
                    </label>
                    <label>
                        User Name:
                        <input
                            onChange={e => setUsernameValue(e.target.value)}
                            value={usernameValue} />
                    </label>
                    <hr style={{ margin: "2rem" }} />
                    <button onClick={saveChanges}>Save Changes</button>
                    <button onClick={resetValues}>Reset Values</button>
                    <button onClick={logOut}>Log Out</button>
                </div>
            </div>
        </section>
    );
}

export default UserInfo