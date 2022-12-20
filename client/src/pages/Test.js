import React from 'react'

function Test() {
    return (
        <div className="register-container">
            <div className="wrapper">
                <div className="title">Register</div>
                <div className="content">
                    <div class="user-details">
                        <div class="input-box">
                            <label htmlFor="firstName" className="details">First Name</label>
                            <input type="text" placeholder="Enter your name"/>
                        </div>
                        <div class="input-box">
                            <label htmlFor="lastName" className="details">Last Name</label>
                            <input type="text" placeholder="Enter your username" required/>
                        </div>
                        <div class="input-box">
                            <label htmlFor="email" className="details">Email</label>
                            <input type="text" placeholder="Enter your email" required/>
                        </div>
                        <div class="input-box">
                            <label htmlFor="userName" className="details">User Name</label>
                            <input type="text" placeholder="Enter your number" required/>
                        </div>
                        <div class="input-box">
                            <label htmlFor="password" className="details">Password</label>
                            <input type="text" placeholder="Enter your number" required/>
                        </div>
                        <div class="input-box">
                            <label htmlFor="confirmPassword" className="details">Confirm Password</label>
                            <input type="text" placeholder="Enter your number" required/>
                        </div>
                    </div>
                    <div class="button">
                        <input type="submit" value="Register"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Test