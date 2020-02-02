import React, { useEffect, useState } from 'react';
import * as FB from 'fb-sdk-wrapper'

function Authenticate(props) {
    const [status, setStatus] = useState();
    const [details, setDetails] = useState({});

    useEffect(() => {
        (async () => {
            await loadFaceBookSDK();
            getStatus();
        })()
    }, [])


    const loadFaceBookSDK = async () => {
        await FB.load();
        await FB.init({
            appId: "211952919854909", //config.appId
            autoLogAppEvents: true,
            xfbml: true,
            cookie: true,
            version: 'v5.0',
            status: true,
        });
        await getStatus();
    }

    const getStatus = async () => {
        const _status = await FB.getLoginStatus();
        setStatus(_status);
        handleStatusResponse(_status);
    }

    const handleStatusResponse = async status => {
        if (status.status === "connected")
            return getUserDetails();

    }

    const getUserDetails = async () => {
        const _details = await FB.api('/me');
        console.log(_details);
        setDetails(_details);
    }

    const logout = async () => {
        await FB.logout();
        getStatus();

    }

    const login = async () => {
        await FB.login();
        getStatus();

    }

    return (
        <>
            {
                status &&
                <>
                    {
                        (status.status === "connected") &&
                        // <div>
                        //     {details.name}
                        //     <br />
                        //     {details.id}
                        //     <button onClick={logout}>Logout</button>

                        props && props.children
                        // </div>
                    }
                    {/* {
                        (!status.status || status.status === "unknown") &&
                        <>
                            <button onClick={login}>Login with Facebook</button>
                        </>
                    } */}
                </>

            }
        </>
    )

}

export default Authenticate;
