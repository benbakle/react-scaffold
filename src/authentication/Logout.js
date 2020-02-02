import React, { useState } from 'react';
import AuthenticationContext from './authentication-context';
import authenticationService from './authentication-service';
import * as Facebook from 'fb-sdk-wrapper';

function Logout() {
    return (
        <AuthenticationContext.Consumer>
            {({ user, setUser }) =>  {
            user.logout();
            setUser(user);
            return <span>loading</span>;
        }}
        </AuthenticationContext.Consumer>
    )
}

export default Logout 