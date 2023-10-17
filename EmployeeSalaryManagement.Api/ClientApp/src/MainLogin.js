import React from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
};

const buttonContainerStyles = {
    display: 'flex',
    gap: '20px',
};

const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
};

function MainLogin() {

    const navigate = useNavigate();
    const handleLoginUser = () => {
        navigate("/empLogin");
    };

    const handleLoginAdmin = () => {
        navigate("/Login");
    };

    return (
        <div style={containerStyles}>
            <h1>Login Selection Page</h1>
            <div style={buttonContainerStyles}>
                <button style={buttonStyles} onClick={handleLoginUser}>
                    Login as User
                </button>
                <button style={buttonStyles} onClick={handleLoginAdmin}>
                    Login as Admin
                </button>
            </div>
        </div>
    );
}

export default MainLogin;