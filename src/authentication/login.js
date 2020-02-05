import React, { useEffect, useState } from 'react';
import AuthenticationContext from "./authentication-context";
import history from '../services/history';

export default function Login(props) {
    const [redirectUrl, setRediredtUrl] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(props.location.search);
        const _redirectUrl = urlParams.get('redirect');
        setRediredtUrl(_redirectUrl);
        console.log(redirectUrl);
    });

    const _login = async (login) => {
        await login();
        history.push(`/${redirectUrl}`);
    }


    return (
        <AuthenticationContext.Consumer>
            {({ login, refreshContext }) => {
                // login && login(refreshContext);
                login && _login(login);
            }}
        </AuthenticationContext.Consumer>
    )
}