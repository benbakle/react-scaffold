import React from 'react';
import AuthenticationContext from './authentication-context';

function Login() {
    return (
        <AuthenticationContext.Consumer>
            {({ user, setUser }) =>  {
            user.login(setUser);
            return <span>loading</span>;
        }}
        </AuthenticationContext.Consumer>
    )
}

export default Login 