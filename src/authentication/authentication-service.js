import * as Facebook from 'fb-sdk-wrapper';

class AuthenticationService {

    log = console.log;
    FB;


    load = async () => {
        try {
            await this.loadFaceBookSDK();
        }
        
        catch (error) {
            this.log("An error occured while loading the Facebook SDK");
            return false;
        }

        return true;
    }

    async loadFaceBookSDK() {
        if (!this.FB) {
            this.log("Loading Facebook SDK v5.0...")
            this.FB = Facebook;
            const test = await this.FB.load();
            await this.FB.init({
                appId: "211952919854909", //config.appId
                autoLogAppEvents: true,
                xfbml: true,
                cookie: true,
                version: 'v5.0',
                status: true,
            });
            this.log("Successfully loaded SDK!", test);
            this.setStatus();

        }
    }

    isAuthenticated = () => {
        const _status = JSON.parse(localStorage.getItem("status"));
        const token = _status && _status.authResponse && _status.authResponse.accessToken;
        return !!token;
    };

    user = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    logout = async () => {
        await this.FB.logout(this.token);
        this.setStatus();
    }

    login = async () => {
        await this.FB.login();
        this.setStatus();
    }

    async setStatus() {
        this.log("Getting user status...")
        const _status = await this.FB.getLoginStatus();
        localStorage.setItem("status", JSON.stringify(_status));
        this.handleStatusResponse(_status);
    }

    async handleStatusResponse(status) {
        if (status.status === "connected")
            return this.setUser();
    }

    async setUser() {
        this.log("Getting user details...")
        const _user = await this.FB.api("/me?fields=name, email, picture");
        localStorage.setItem("user", JSON.stringify(_user));
        this.log("User details aquired (name, email, picture)");
    }
}

export default new AuthenticationService();