import decode from 'jwt-decode';


class AuthenticationService {
    _currentUser;
    _accessToken;

    authenticate = (user) => {
        console.log(user);
        this._currentUser = this.configureUser(user);
        this.hydrateUserState(user);
    }

    configureUser = (user) => {
        return {
            name: (!!user && user.name) || "Guest",
            email: (!!user && user.email) || "no email",
            picture: (!!user && user.picture.data.url) || './images/guestProfile',
        }
    }

    hydrateUserState = user => {
        this._accessToken = user.accessToken;
        this.setUserInfo({
            accessToken: this._accessToken,
            idToken: user.userID,
        });

        // if (window.location.href.indexOf("signin-oidc") !== -1) {
        //     this.navigateToScreen();
        // }
    }

    setUserInfo = authResult => {
       // const data = this.parseJwt(this._accessToken);
        this.setSessionInfo(authResult);
        this.setUser(authResult.idToken);
    };

    parseJwt = token => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    setSessionInfo(authResult) {
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
    }

    getUser = () => {
        const user = this._currentUser;
        if (!user) {
            return //redirect;
        }
        return user;
    };

    setUser = data => {
        localStorage.setItem("userId", data);
    };

    navigateToScreen = () => {
        window.location.replace("/dashboard");
    };

    //methods not in constructor
    isAuthenticated = () => {
        const access_token = localStorage.getItem("access_token");
        return !!access_token;
    };

    createSigninRequest = () => {
        return this._userManager.createSigninRequest();
    };

    signinRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this._userManager.signinRedirect({});
    };

    signinSilent = () => {
        this._userManager.signinSilent()
            .then(user => {
                console.log("signed in", user);
            })
            .catch(err => {
                console.log(err);
            });
    };

    signinSilentCallback = () => {
        this._userManager.signinSilentCallback();
    };

    logout = () => {
        this._userManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this._userManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this._userManager.signoutRedirectCallback()
            .then(this.redirectToPublicUrl)
            .catch(() => { });

        this._userManager.clearStaleState();
    };

    redirectToPublicUrl = () => {
        // used as redirect value in signoutRedirectCallback.
        // faked until we figure out what this is.
        let process = { env: { REACT_APP_PUBLIC_URL: "/app-public-url" } };

        window.location.replace(process.env.REACT_APP_PUBLIC_URL);
        localStorage.clear();
    }
}

export default new AuthenticationService();