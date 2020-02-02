import React from 'react';
import AuthenticationContext from './authentication-context';

function Login() {

    const handleLogin = async (action, refreshContext) => {
        await action();
        refreshContext();
    }

    return (
        <AuthenticationContext.Provider>
            <AuthenticationContext.Consumer>
                {({ isAuthenticated, user, logout, login, refreshContext }) => (
                    <>
                        {
                            isAuthenticated && isAuthenticated() &&
                            <div className="heading">
                                <img src={user().picture.data.url} alt="user" />
                                {`Welcome ${user().name}`}
                                <button onClick={() => handleLogin(logout, refreshContext)}>logout</button>
                            </div>
                        }
                        {
                            isAuthenticated && !isAuthenticated() &&
                            <button onClick={() => handleLogin(login, refreshContext)}>login</button>
                        }
                    </>
                )}
            </AuthenticationContext.Consumer>
        </AuthenticationContext.Provider>
    )
}

export default Login 