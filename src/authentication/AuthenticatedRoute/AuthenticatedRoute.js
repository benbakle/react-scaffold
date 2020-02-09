import React from 'react';
import { Route } from "react-router-dom";
import { Profile } from 'react-facebook';
import { jyb_admin_ids } from '../../authentication/authentication-config';

export default function AuthenticatedRoute({ component: Component, roles, ...rest }) {
    const authorizedRole = (id) => {
        let _authorized;

        for (let i = 0; i < jyb_admin_ids.length; i++)
            _authorized = _authorized || (jyb_admin_ids[0] === id)

        return _authorized;
    }

    return (
        <Profile>
            {({ loading, profile }) => (
                <>
                    {
                        !loading &&
                        <Route {...rest} render={routeProps =>
                            (profile && authorizedRole(profile.id)
                                ? <Component {...routeProps} />
                                : <span>Admin Only Message</span>
                            )} />
                    }
                </>
            )}
        </Profile>
    );
}