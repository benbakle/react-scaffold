import { useAuthentication } from "./authentication-context";
import React, { useEffect, useState } from 'react';
import Loading from "../components/Loading/Loading";

export default function Login(props) {
    const [_login, setLogin] = useState();
    const [_refreshContext, setRefreshContext] = useState();
    const { login, refreshContext } = useAuthentication();

    useEffect(() => {
        setLogin(login);
        setRefreshContext(refreshContext);
    }, [login, refreshContext])

    return (
        <>
            {_login && _login(_refreshContext)}
            <Loading />
        </>
    )
}