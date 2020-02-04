import React, { useState, useEffect } from "react";
import authenticationService from "./authentication-service";
import LogDatShit from "../services/logger";
import Loading from "../components/Loading/Loading";

const { Provider, Consumer } = React.createContext();

function AuthenticationContextProvider(props) {
    const [loaded, setLoadedTo] = useState();
    const [context, setContext] = useState();

    const refreshContext = async () => {
        setLoadedTo(false);
        let _loaded =await authenticationService.load();
        setLoadedTo(_loaded);
        setContext(authenticationService)
    }

    useEffect(() => { refreshContext(); }, []);

    return (
        loaded ?
            <Provider value={{ ...context, refreshContext }}>{props.children}</Provider> :
            <Loading />
    )
}

const AuthenticationContext = { Provider: AuthenticationContextProvider, Consumer };

export default AuthenticationContext;