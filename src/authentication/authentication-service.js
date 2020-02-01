import * as Facebook from 'fb-sdk-wrapper';
import history from '../services/history';


class AuthenticationService {

    async load() {
        await Facebook.load();
        await Facebook.init({
            appId: "211952919854909", //config.appId
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v5.0',
            status: true,
        });

        await this.setStatus();

        if (this.isConnected())
            this.setDetails()
    }

    isConnected = () => {
        return JSON.parse(localStorage.getItem("status")).status === "connected";
    }

    login = async (setUser) => {
        await Facebook.login({ scope: 'public_profile,email' });
        await this.setStatus();
        await this.setDetails();
        history.push('/');
        this.load().then(() => {
            setUser(this);
        })


    }

    logout = async (setUser) => {
        await Facebook.logout(this.token());
        await this.setStatus();
        history.push('/');
        this.load().then(() => {
            setUser(this);
        })
    }

    details = () => {
        return JSON.parse(localStorage.getItem("details"));
    }

    async setStatus() {
        const _status = await Facebook.getLoginStatus();
        localStorage.setItem("status", JSON.stringify(_status));
    }

    async setDetails() {
        const _details = await Facebook.api('/me?fields=id,name,picture');
        localStorage.setItem("details", JSON.stringify(_details));
    }


    token() {
        return JSON.parse(localStorage.getItem("status")).accessToken;
    }


    setUser = async () => {
        return Facebook.api('/me?fields=id,name,picture').then(res => { this.user = res });
        // return await Facebook.api('/me?fields=id,name,picture');
    }



    // isConnected = async () => {
    //     const _status = await this.status();
    //     return _status.status === "connected";
    // }

}

export default new AuthenticationService();

    // authenticate = (user) => {
    //     this.setUser(this.configureUser(user));
    //     this.hydrateUserState(user);
    // }

    // configureUser = (user) => {
    //     return {
    //         name: (!!user && user.name) || "Guest",
    //         email: (!!user && user.email) || "no email",
    //         picture: (!!user && user.picture.data.url) || './images/guestProfile',
    //     }
    // }

    // hydrateUserState = user => {
    //     if (!user)
    //         return
    //     this._accessToken = user.accessToken;
    //     this.setUserInfo({
    //         accessToken: this._accessToken,
    //         idToken: user.userID,
    //     });

    //     // if (window.location.href.indexOf("signin-oidc") !== -1) {
    //     //     this.navigateToScreen();
    //     // }
    // }

    // setUserInfo = authResult => {
    //     // const data = this.parseJwt(this._accessToken);
    //     this.setSessionInfo(authResult);
    //     // this.setUser(authResult);
    // };

    // // parseJwt = token => {
    // //     const base64Url = token.split(".")[1];
    // //     const base64 = base64Url.replace("-", "+").replace("_", "/");
    // //     return JSON.parse(window.atob(base64));
    // // };

    // setSessionInfo(authResult) {
    //     localStorage.setItem("access_token", authResult.accessToken);
    //     localStorage.setItem("id_token", authResult.idToken);
    // }

    // getUser = () => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     if (!user) {
    //         return //redirect;
    //     }
    //     return user;
    // };

    // setUser = user => {
    //     localStorage.setItem("user", JSON.stringify(user));
    // };

    // navigateToScreen = () => {
    //     window.location.replace("/dashboard");
    // };

    // //methods not in constructor
    // isAuthenticated = () => {
    //     const access_token = localStorage.getItem("access_token");
    //     return !!access_token;
    // };

    // createSigninRequest = () => {
    //     return this._userManager.createSigninRequest();
    // };

    // signinRedirect = () => {
    //     localStorage.setItem("redirectUri", window.location.pathname);
    //     this._userManager.signinRedirect({});
    // };

    // signinSilent = () => {
    //     this._userManager.signinSilent()
    //         .then(user => {
    //             console.log("signed in", user);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    // signinSilentCallback = () => {
    //     this._userManager.signinSilentCallback();
    // };

    // logout = () => {
    //     this._userManager.signoutRedirect({
    //         id_token_hint: localStorage.getItem("id_token")
    //     });
    //     this._userManager.clearStaleState();
    // };

    // signoutRedirectCallback = () => {
    //     this._userManager.signoutRedirectCallback()
    //         .then(this.redirectToPublicUrl)
    //         .catch(() => { });

    //     this._userManager.clearStaleState();
    // };

    // redirectToPublicUrl = () => {
    //     // used as redirect value in signoutRedirectCallback.
    //     // faked until we figure out what this is.
    //     let process = { env: { REACT_APP_PUBLIC_URL: "/app-public-url" } };

    //     window.location.replace(process.env.REACT_APP_PUBLIC_URL);
    //     localStorage.clear();
    // }
