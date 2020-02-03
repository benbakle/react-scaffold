import React from 'react';
import { Route } from "react-router-dom";
import AuthenticationContext from "../../authentication/authentication-context";

export default function AuthenticatedRoute(props) {
    return (
        <AuthenticationContext.Consumer>
            {({ isAuthenticated }) => (
                isAuthenticated && isAuthenticated() &&
                <Route exact path={props.path} component={props.component} />
            )}
        </AuthenticationContext.Consumer>
    )
}