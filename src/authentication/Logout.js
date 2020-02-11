import React from 'react';
import { useAuthentication } from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Logout() {
    const { logout} = useAuthentication();

    const _logout = () => {
        logout && logout();

    }

    return (
        <>
            {_logout()}
            <Loading />
        </>
    )
}