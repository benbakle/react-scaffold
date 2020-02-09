import React from 'react';
import './user-login.scss';
import { Login, Profile } from 'react-facebook';

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

    return (
        <div className="user-login">
            <Profile>
                {({ loading, profile }) => (
                    <>
                        {
                            !loading && profile &&
                            <div className="flex flex-end align-center">
                                <div className="user-details">
                                    <ul>
                                        <li>{profile.name}</li>
                                        <li className="small">Role: {profile.role === "admin" ? "Administrator" : "Super Fan"}</li>
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
                        {
                            !loading && !profile &&
                            <div className="flex flex-end align-center">
                                <div className="button-wrapper">
                                    <Login scope="email" onCompleted={handleLoginResponse} onError={handleError}>
                                        {({ loading, handleClick, error, data }) => (
                                            <>
                                                {
                                                    loading &&
                                                    <span>Loading...</span>
                                                }
                                                {
                                                    !loading &&
                                                    <button onClick={handleClick}>Login with Facebook</button>
                                                }
                                            </>
                                        )}
                                    </Login>
                                </div>
                            </div>
                        }
                    </>
                )}
            </Profile>
        </div>
    )
}