import React from 'react';
import AuthenticationContext from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Login() {
    return (
        <AuthenticationContext.Consumer>
            {({ login, refreshContext }) => {
                login(refreshContext);
            }}
        </AuthenticationContext.Consumer>
    )
}