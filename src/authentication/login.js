import React, { useEffect, useState } from 'react';
import AuthenticationContext from "./authentication-context";
import history from '../services/history';

export default function Login(props) {
    const [redirectUrl, setRediredtUrl] = useState();
    const [paramsHaveBeenChecked, setParamsHaveBeenChecked] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(props.location.search);
        const _redirectUrl = urlParams.get('redirect');
        setRediredtUrl(_redirectUrl);
        setParamsHaveBeenChecked(true);
    }, []);

    const _login = async (login, refreshContext) => {
        console.log(redirectUrl);
        login && login(refreshContext, redirectUrl);
    }


    return (
        <AuthenticationContext.Consumer>
            {({ login, refreshContext }) => {
                login && paramsHaveBeenChecked && _login(login, refreshContext);
            }}
        </AuthenticationContext.Consumer>
    )
}