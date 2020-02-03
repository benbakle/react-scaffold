import * as Facebook from 'fb-sdk-wrapper';
import LogDatShit from '../services/logger';
import history from '../services/history';

class AuthenticationService {
    log = LogDatShit.log;
    FB;

    load = async () => {
        try {
            await this.loadFaceBookSDK();
            return true;
        }

        catch (error) {
            this.log("An error occured while loading the Facebook SDK");
            return false;
        }
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
            await this.setStatus();

        }
    }

    isAuthenticated = () => {
        const _status = JSON.parse(localStorage.getItem("status"));
        const token = _status && _status.authResponse && _status.authResponse.accessToken;
        return !!token;
    };

    user = () => {
        let _user = JSON.parse(localStorage.getItem("user"));
        let role = this.getRole(_user.id);
        _user.role = role
        return this.flattenUser(_user);
    }

    flattenUser(user) {
        return { ...user, picture: user.picture.data.url };
    }

    status = () => {
        return JSON.parse(localStorage.getItem("status"));
    }


    logout = async (callback) => {
        await this.FB.logout(this.token);
        await this.setStatus();
        callback && callback();
        history.push('/');
        this.log("User has logged out!")
    }

    login = async (callback) => {
        await this.FB.login();
        await this.setStatus();
        callback && callback();
        history.push('/');
        this.log("User has logged in!")
    }

    getRole(id) {
        if (id === "10157868078424144")
            return "admin";
        return "standard"
    }

    async setStatus() {
        this.log("Getting user status...")
        const _status = await this.FB.getLoginStatus();
        localStorage.setItem("status", JSON.stringify(_status));
        await this.handleStatusResponse(_status.status);
    }

    async handleStatusResponse(status) {
        if (status === "connected")
            return await this.setUser();
    }

    async setUser() {
        this.log("Getting user details...")
        let _user = await this.FB.api("/me?fields=name, email, picture.width(800).height(800), id");
        localStorage.setItem("user", JSON.stringify(_user));
        this.log("User details aquired (name, email, picture)");
    }


}

export default new AuthenticationService();