import React, { useEffect, useState } from 'react';
import { useAuthentication } from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Logout() {
    const { logout, refreshContext } = useAuthentication();

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