import React, { useEffect } from 'react';
import { useAuthentication } from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Logout() {
    const { logout } = useAuthentication();

    useEffect(() => {
        logout();
    }, [logout])

    return (
        <>
            <Loading />
        </>
    )
}