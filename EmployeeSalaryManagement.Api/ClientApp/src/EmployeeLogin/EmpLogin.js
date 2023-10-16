import React, { Fragment, useState, useEffect } from 'react';
import service from './services';
import './EmpLogin.css';
import { useNavigate } from 'react-router-dom';

function EmpLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enableError, setEnableError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError(false);
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordError(false);
    }

    async function handleLogin() {

        if (!email || !password) {
            // Check if email or password is empty
            setEmailError(!email);
            setPasswordError(!password);
            return;
        }

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!email.match(emailRegex)) {
            setEmailError(true);
            return;
        }

        var data = { email: email, password: password };
        var accessToken = await service.Login(data);

        if (accessToken !== null && accessToken !== "Error") {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("isEmployee", true);

            var userDetails = service.getUserDetailsFromToken();

            if (userDetails.employeeId > 0) {
                navigate("/employee");
            }
            else {
                setEnableError(true);
            }
        }
        else {
            setEnableError(true);
        }
    }

    async function handleClear() {
        setPassword("");
        setEmail("");
        setEmailError(false);
        setPasswordError(false);
        setEnableError(false);

        window.location.reload();
    }



    return (
        <Fragment>
            <h1 className='container'>Employee Login</h1>

            <div className="label-container">
                <label className="lbl" >Username/Email  </label>

                <input className="input1" type="text" id="email" placeholder="Enter username/email" onChange={(e) => handleEmailChange(e.target.value)} value={email} />
                {emailError && <p className="validation-error">Please enter a valid email.</p>}
            </div>
            <div className="label-container">
                <label className="lbl">Password  </label>
                <input className="input2" type="password" id="password" placeholder="Enter password" onChange={(e) => handlePasswordChange(e.target.value)} value={password} />
                {passwordError && <p className="validation-error">Please enter a password.</p>}
            </div>

            <div className="button-container">
                <button className="btn1" onClick={(e) => handleClear()}>Clear</button>
                <button className="btn2" onClick={(e) => handleLogin()}>Login</button>
            </div>

            {enableError ? <label className="red-label">Incorrect Username or Password... Please try again...</label> : null}
        </Fragment>

    )
}
export default EmpLogin;