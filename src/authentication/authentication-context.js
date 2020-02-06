import React, { useState, useEffect, useContext } from "react";
import authenticationService from "./authentication-service";
import Loading from "../components/Loading/Loading";

const AuthenticationContext = React.createContext();

function AuthenticationContextProvider(props) {
    const [loaded, setLoadedTo] = useState();
    const [context, setContext] = useState();

    const refreshContext = async () => {
        setLoadedTo(false);
        let _loaded = await authenticationService.load();
        setLoadedTo(_loaded);
        setContext(authenticationService)
    }

    useEffect(() => { refreshContext(); }, [loaded]);

    return (
        loaded
            ? <AuthenticationContext.Provider value={{ ...context, refreshContext }}>
                {props.children}
            </AuthenticationContext.Provider>
            : <Loading />
    )
}

const useAuthentication = () => {
    const _context = useContext(AuthenticationContext);
    return _context;
}

export { AuthenticationContextProvider, useAuthentication };