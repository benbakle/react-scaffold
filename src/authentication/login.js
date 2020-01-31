import React from 'react';
import FacebookLogin from 'react-facebook-login';
import AuthenticationContext from './authentication-context';
import authenticationService from './authentication-service';

function Login() {
    const handleLogin = (res, setUser) => {
        authenticationService.authenticate(res);
        console.log(authenticationService);
        setUser(authenticationService);
    }

    return (
        <AuthenticationContext.Consumer>
            {({ user, setUser }) => (
                <>
                    {!user.isAuthenticated() &&
                        <FacebookLogin
                            appId="211952919854909"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={() => { return <span>loading...</span> }}
                            callback={res => { handleLogin(res, setUser) }}
                        />
                    }
                    {
                        user.isAuthenticated &&
                        <button onClick={authenticationService.logout}>Logout</button>
                    }

                </>
            )}
        </AuthenticationContext.Consumer>
    )
}

export default Login 