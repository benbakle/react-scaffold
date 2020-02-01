import React, { useState } from 'react';
import AuthenticationContext from './authentication-context';
import authenticationService from './authentication-service';
import * as Facebook from 'fb-sdk-wrapper';
import mainFunction from './auth';

function Logout() {
    return (
        <AuthenticationContext.Consumer>
            {({ user, setUser }) =>  {
            user.logout(setUser);
            return <span>loading</span>;
        }}
        </AuthenticationContext.Consumer>
    )
}

export default Logout 