import React from 'react';
import { Route } from "react-router-dom";
import { useAuthentication } from "../authentication-context";

export default function AuthenticatedRoute({ component: Component, roles, ...rest }) {
    const { user } = useAuthentication();

    const authorizedRole = (role) => {
        let _authorized;

        for (let i = 0; i < roles.length; i++)
            _authorized = _authorized || (roles[0] === role)

        return _authorized;
    }

    return (
        <Route {...rest} render={routeProps =>
            (user && user() && authorizedRole(user().role)
                ? <Component {...routeProps} />
                : <span>Admin Only Message</span>
            )} />
    );
}