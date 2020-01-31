import React from 'react';
import FacebookLogin from 'react-facebook-login';
import AuthenticationContext from './authentication-context';
import authenticationService from './authentication-service';

function Login() {
    const handleLogin = (user, setUser) => {
        authenticationService.authenticate(user);
        console.log(authenticationService);
        setUser(authenticationService);
    }

    return (
        <AuthenticationContext.Consumer>
            {({ user, setUser }) => (
                <>
                    {user && !user.isAuthenticated() &&
                        <FacebookLogin
                            appId="211952919854909"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={() => { return null }}
                            callback={user => { handleLogin(user, setUser) }}
                        />
                    }
                </>
            )}
        </AuthenticationContext.Consumer>
    )
}

export default Login 