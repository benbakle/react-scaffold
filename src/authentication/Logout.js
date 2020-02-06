import React, { useEffect, useState } from 'react';
import { useAuthentication } from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Logout() {
    const [_logout, setLogout] = useState();
    const [_refreshContext, setRefreshContext] = useState();
    const { logout, refreshContext } = useAuthentication();

    useEffect(() => {
        setLogout(logout);
        setRefreshContext(refreshContext);
    }, [logout, refreshContext])

    return (
        <>
            {_logout && _logout(_refreshContext)}
            <Loading />
        </>
    )
}