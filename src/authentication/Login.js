import React, { useEffect } from 'react';
import { useAuthentication } from "./authentication-context";
import Loading from "../components/Loading/Loading";

export default function Login(props) {
    const { login } = useAuthentication();

    useEffect(() => {
        login("./admin");
    }, [login])

    return (
        <>
            <Loading />
        </>
    )
}