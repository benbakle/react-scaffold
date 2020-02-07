import { useAuthentication } from "./authentication-context";
import React, { useEffect, useState } from 'react';
import Loading from "../components/Loading/Loading";

export default function Login(props) {
    const { login } = useAuthentication();

    const _login = () => {
        login && login();
    }
    return (
        <>
            {_login()}
            <Loading />
        </>
    )
}