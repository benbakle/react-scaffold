import React, { useState, useEffect } from 'react';
import './user-login.scss';
import { Login, Profile, Status } from 'react-facebook';
import { jyb_admin_ids } from '../../authentication/authentication-config';

export default function UserLogin() {

    const handleLoginResponse = (res) => { console.log(res) }
    const handleError = (error) => { console.log({ error }) }

    const copy = () => {
        var copyText = document.getElementById("userId");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
    }

    const logout = () => {
        window.FB.logout();
    }

    const authorizedRole = (id) => {
        let _authorized;

        for (let i = 0; i < jyb_admin_ids.length; i++)
            _authorized = _authorized || (jyb_admin_ids[0] === id)

        return _authorized;
    }

    return (
        <div className="user-login">
            <Status>
                {({ loading, status }) => (
                    <>
                        {
                            !loading &&
                            <>
                                {
                                    status && status === "connected" &&
                                    <Profile fields="id, first_name, last_name, middle_name, name_format, short_name, name, email, picture.width(800).height(800)">
                                        {({ loading, profile }) => (
                                            <>
                                                {
                                                    !loading &&
                                                    <>
                                                        {
                                                            profile &&
                                                            <div className="flex flex-end align-center">
                                                                <div className="user-details">
                                                                    <ul>
                                                                        <li>{profile.name}</li>
                                                                        <li className="small">Role: {authorizedRole(profile.id) ? "Administrator" : "Super Fan"}</li>
                                                                        <li><button className="small" onClick={copy}>Copy User ID</button></li>

                                                                        <li><button className="small" onClick={logout}>logout</button></li>
                                                                        <li>
                                                                            <a href="https://developers.facebook.com/apps/211952919854909/dashboard/" target="blank">
                                                                                JYB Facebook App Dashboard
                                                                </a>
                                                                        </li>
                                                                    </ul>

                                                                    {/* hidden input for copying */}
                                                                    <input id="userId" value={profile.id} style={{ position: "fixed", top: "-100rem" }} onChange={() => { return }} />

                                                                </div>
                                                                <img src={profile.picture.data.url} alt="user" />
                                                            </div>
                                                        }

                                                    </>
                                                }

                                            </>

                                        )}
                                    </Profile>
                                }
                                {
                                    status && status !== "connected" &&
                                    <Login scope="email" onCompleted={handleLoginResponse} onError={handleError}>
                                        {({ loading, handleClick, error, data }) => (
                                            <>
                                                {
                                                    loading &&
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                }
                                                {
                                                    !loading &&
                                                    <button onClick={handleClick}>Login with Facebook</button>
                                                }
                                            </>
                                        )}
                                    </Login>
                                }
                            </>
                        }
                    </>
                )

                }
            </Status>


        </div>

    )
}