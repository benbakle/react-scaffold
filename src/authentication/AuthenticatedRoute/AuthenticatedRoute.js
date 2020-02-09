import React from 'react';
import { Route } from "react-router-dom";
import { Profile } from 'react-facebook';

export default function AuthenticatedRoute({ component: Component, roles, ...rest }) {
    let user;
    const authorizedRole = (role) => {
        let _authorized;

        for (let i = 0; i < roles.length; i++)
            _authorized = _authorized || (roles[0] === role)

        return _authorized;
    }

    return (
        <Profile>
            {({ loading, profile }) => (
                <>
                    {
                        !loading &&
                        <Route {...rest} render={routeProps =>
                            (profile
                                ? <Component {...routeProps} />
                                : <span>Admin Only Message</span>
                            )} />
                    }
                </>
            )}
        </Profile>
    );
}