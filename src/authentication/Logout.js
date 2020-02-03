import React from 'react';
import AuthenticationContext from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Logout() {
    return (
        <AuthenticationContext.Consumer>
            {({ logout, refreshContext }) => {
                logout(refreshContext);
                return <Loading />;
            }}
        </AuthenticationContext.Consumer>
    )
}