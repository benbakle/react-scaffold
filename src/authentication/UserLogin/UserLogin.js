import React, { useState } from 'react';
import { useAuthentication } from '../authentication-context';
import history from '../../services/history';
import Loading from '../../components/Loading/Loading';
import './user-login.scss';

export default function UserLogin() {
    const [loggingOut, setLoggingOut] = useState();
    const { isAuthenticated, user } = useAuthentication();

    const logout = () => {
        setLoggingOut(true);
        history.push("/logout")
    }

    const copy = () => {
        var copyText = document.getElementById("userId");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
    }

    return (
        <div className="user-login">
            {
                isAuthenticated && isAuthenticated() && !loggingOut &&
                <div className="flex flex-end align-center">
                    <div className="user-details">
                        <ul>
                            <li>{user().name}</li>
                            <li className="small">Role: {user().role === "admin" ? "Administrator" : "Super Fan"}</li>
                            <li><button className="small" onClick={copy}>Copy User ID</button></li>
                            <li><button className="small" onClick={logout}>logout</button></li>
                            <li>
                                <a href="https://developers.facebook.com/apps/211952919854909/dashboard/" target="blank">
                                    JYB Facebook App Dashboard
                                            </a>
                            </li>
                        </ul>

                        {/* hidden input for copying */}
                        <input id="userId" value={user().id} style={{ position: "fixed", top: "-100rem" }} onChange={() => { return }} />

                    </div>

                    <img src={user().picture} alt="user" />
                </div>
            }
            {
                isAuthenticated && !isAuthenticated() && !loggingOut &&
                <div className="flex flex-end align-center">
                    <div className="button-wrapper">
                        <button onClick={() => { history.push(`/login?redirect=test`) }}>Login with Facebook</button>
                    </div>
                </div>
            }
            {!isAuthenticated && <Loading />}
        </div>
    )
}

