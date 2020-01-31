import React, { useState } from 'react';
import AuthenticationContext from './authentication-context';
import authenticationService from './authentication-service';
import * as Facebook from 'fb-sdk-wrapper';

function Login() {
    const [_status, _setStatus] = useState();

    const status = async () => {
        const result = await authenticationService.status();
        console.log(result);
        _setStatus(result);
    }

    const login = async () => {
        const _login = await authenticationService.login();
        console.log(_login);
    }

    const logout = () => {
        Facebook.getLoginStatus().then(res => {
            if (res.status !== "connected")
                return;
            Facebook.logout(res.authResponse.accessToken).then(res => {
                console.log(res)

            });
        })
    }

    return (
        <AuthenticationContext.Consumer>
            {({ user, setUser }) => (
                <>
                    {/* {!user.isAuthenticated() &&
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
                    } */}

                    <button onClick={status}>Status</button>
                    <br />
                    {!!_status && _status.status}
                    <hr />
                    <button onClick={login}>Login</button>
                    <button onClick={logout}>Logout</button>

                </>
            )}
        </AuthenticationContext.Consumer>
    )
}

export default Login 