import React, { useState } from "react";
import authenticationService from "./authentication-service";

const { Provider, Consumer } = React.createContext();

function AuthenticationContextProvider(props) {
    const [user, setUser] = useState(authenticationService);
    return (<Provider value={{ user, setUser }}>{props.children}</Provider>)
}

const AuthenticationContext = { Provider: AuthenticationContextProvider, Consumer };

export default AuthenticationContext;