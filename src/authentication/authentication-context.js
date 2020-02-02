import React, { useState, useEffect } from "react";
import authenticationService from "./authentication-service";

const { Provider, Consumer } = React.createContext();

function AuthenticationContextProvider(props) {
    const [loaded, setLoadedTo] = useState();
    const [context, setContext] = useState();

    const refreshContext = async () => {
        setLoadedTo(false);
        const loaded = await authenticationService.load();
        setLoadedTo(loaded);
        setContext(authenticationService)
        console.log(`Authentication loaded ${loaded ? "successfully" : "in error"}!`)
    }

    useEffect(() => {
        refreshContext();
    }, []);

    return (
        <>
            {
                loaded &&
                <Provider value={{ ...context, refreshContext }}>{props.children}</Provider>
            }
        </>
    )
}

const AuthenticationContext = { Provider: AuthenticationContextProvider, Consumer };

export default AuthenticationContext;