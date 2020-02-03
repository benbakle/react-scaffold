import React, { useState } from 'react';
import AuthenticationContext from './authentication-context';
import history from '../services/history';
import Loading from '../components/Loading/Loading';

export default function UserLogin() {
    const [loggingOut, setLoggingOut] = useState();

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
        <AuthenticationContext.Consumer>
            {({ isAuthenticated, user }) => (
                <div className="login">
                    {
                        isAuthenticated && isAuthenticated() && !loggingOut &&
                        <div className="flex flex-end align-center">
                            <div style={{ padding: "3rem" }}>
                                <ul>
                                    <li>{user().name}</li>
                                    <li><a href="" onClick={copy}>{user().id}</a></li>
                                    <li>{user().role === "admin" ? "Administrator" : "Standard"}</li>
                                </ul>
                                
                                {/* hidden input for copying */}
                                <input id="userId" value={user().id} style={{ position: "fixed", top: "-100rem" }} />
                                
                                <div className="button-wrapper">
                                    <button onClick={logout}>logout</button>
                                </div>
                            </div>

                            <img src={user().picture} alt="user" style={{ maxWidth: "20rem" }} />
                        </div>
                    }
                    {
                        isAuthenticated && !isAuthenticated() && !loggingOut &&
                        <div className="flex flex-end align-center">
                            <div className="button-wrapper">
                                <button onClick={() => { history.push("/login") }}>login</button>
                            </div>
                        </div>
                    }
                    {!isAuthenticated && <Loading />}
                </div>
            )
            }
        </AuthenticationContext.Consumer >
    )
}
