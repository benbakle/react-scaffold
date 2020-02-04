import React, { useState } from 'react';
import AuthenticationContext from '../authentication-context';
import history from '../../services/history';
import Loading from '../../components/Loading/Loading';
import './user-login.scss';

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
            {({ isAuthenticated, user, feed, jyb }) => (
                <div className="user-login">
                    {
                        isAuthenticated && isAuthenticated() && !loggingOut &&
                        <>
                            <div className="flex flex-end align-center">
                                <div className="user-details">
                                    <ul>
                                        <li>{user().name}</li>
                                        <li className="small">Role: {user().role === "admin" ? "Administrator" : "Super Fan"}</li>
                                        <li><button className="small" onClick={copy}>Copy User ID</button></li>
                                        <li><button className="small" onClick={logout}>logout</button></li>
                                    </ul>

                                    {/* hidden input for copying */}
                                    <input id="userId" value={user().id} style={{ position: "fixed", top: "-100rem" }} onChange={() => { return }} />

                                </div>

                                <img src={user().picture} alt="user" />
                            </div>
                            <div>
                                <div className="heading">Logo</div>
                                <p>{jyb && <img src={jyb().picture.data.url} alt="jyb-logo" />}</p>

                                <div className="heading">Email</div>
                                <p>{jyb && jyb().emails[0]}</p>

                                <div className="heading">About</div>
                                <p>{jyb && jyb().about}</p>

                                <div className="heading">Bio</div>
                                <p>{jyb && jyb().bio}</p>


                                <div className="heading">Location</div>
                                <p>{jyb && `${jyb().location.city}, ${jyb().location.state}`}</p>

                                <div className="heading">Feed</div>
                                {
                                    feed && feed().map((item, key) => (
                                        <div key={key}>
                                            <label>{item.created_time}</label>
                                            <div>{item.message}</div>
                                            <br />
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }
                    {
                        isAuthenticated && !isAuthenticated() && !loggingOut &&
                        <div className="flex flex-end align-center">
                            <div className="button-wrapper">
                                <button onClick={() => { history.push("/login") }}>Login with Facebook</button>
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

