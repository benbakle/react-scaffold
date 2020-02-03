import React from 'react';
import AuthenticationContext from './authentication-context';

function Login() {

    const handleLogin = async (action, refreshContext) => {
        await action();
        refreshContext();
    }

    return (
        <AuthenticationContext.Consumer>
            {({ isAuthenticated, user, logout, login, refreshContext }) => (
                <div className="login">
                    {
                        isAuthenticated && isAuthenticated() &&
                        <div className="flex flex-end align-center">
                            <div style={{padding:"3rem"}}>
                                {user().name}
                                <br />
                                <small>{user().id}</small>
                                <br />
                                {user().role === "admin" ? "Administrator" : "Standard"}
                                <br />
                                <div className="button-wrapper">
                                    <button onClick={() => handleLogin(logout, refreshContext)}>logout</button>
                                </div>
                            </div>
                            <img src={user().picture} alt="user" style={{ maxWidth: "20rem" }} />
                        </div>
                    }
                    {
                        isAuthenticated && !isAuthenticated() &&
                        <div className="flex flex-end align-center">
                            <div className="button-wrapper">
                                <button onClick={() => handleLogin(login, refreshContext)}>login</button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </AuthenticationContext.Consumer>
    )
}

export default Login 