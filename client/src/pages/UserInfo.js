import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { axoisInstance } from "../util/ApiBaseUrlInstance.js";
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';

function UserInfo() {
    const user = useUser();
    const [token, setToken] = useToken();
    console.log(user);
    const { firstname , lastname, username, email, _id } = user;

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
            const {token} = response.data;
            console.log(token);
            setToken(token);
            setShowSuccessMessage(true);
          } catch (err) {
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
        <div className="content-container">
            <h1>Info for {emailValue}</h1>
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
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
            <hr />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}

export default UserInfo