import * as Facebook from 'fb-sdk-wrapper';
import LogDatShit from '../services/logger';
import history from '../services/history';

class AuthenticationService {
    log = LogDatShit.log;
    FB;

    load = () => {
        tryCatch(async () => {
            this.log("Loading Facebook SDK v5.0...")

            await this.loadFaceBookSDK();

            this.log("Successfully loaded Facebook SDK v5.0")
        }, "Faild to load the Facebook SDK")
        return true
    }

    async loadFaceBookSDK() {
        if (!this.FB) {
            this.FB = Facebook;
            await this.FB.load();
            this.init();
            this.setStatus();
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

    jyb = () => {
        return JSON.parse(localStorage.getItem("jyb"));
    }

    feed = () => {
        return JSON.parse(localStorage.getItem("feed"));
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
    }

    init() {
        tryCatch(async () => {
            this.log("Initializing the Facebook SDK...");

            await this.FB.init({
                appId: "211952919854909", //config.appId
                autoLogAppEvents: true,
                xfbml: true,
                cookie: true,
                version: 'v5.0',
                status: true,
            });

            this.log("Successfully initialized the Facebook SDK with with JYB App options!");
        }, "Error initializing the Facebook SDK")
    }

    setStatus() {
        tryCatch(async () => {
            this.log("Getting current user status...")

            const _status = await this.FB.getLoginStatus();
            localStorage.setItem("status", JSON.stringify(_status));

            this.log(`User has status of ${_status.status}`)

            this.setUser();
        }, "Error getting user status.");
    }

    setUser() {
        tryCatch(async () => {
            if (this.status().status !== "connected")
                return;

            this.log("Getting user details...")

            const fields = "id, name, email, picture.width(800).height(800)";
            const _user = await this.FB.api("/me", { fields });
            localStorage.setItem("user", JSON.stringify(_user));

            this.log(`User details aquired : `);
            this.log(JSON.stringify(_user))

            this.setJYB();
        }, `Error getting user details`)
    }

    setJYB() {
        tryCatch(async () => {
            this.log("Getting Joel Young Band details");

            const _accounts = await this.FB.api(`/10157868078424144/accounts`);
            const fields = "about, attire, bio, location, parking, hours, emails, website, picture.width(800).height(800)";
            const _jyb = await this.FB.api(`/${_accounts.data[0].id}`, 'GET', { fields });
            localStorage.setItem("jyb", JSON.stringify(_jyb));

            this.log("Rock 'n Roll! Aquired Joel Young Band details!");

            this.setFeed();
        }, "Error getting Joel Young Band details")
    }

    setFeed() {
        tryCatch(async () => {
            this.log("Getting Joel Young Band post feed...")

            const _feed = await this.FB.api(`/${this.jyb().id}/feed`, 'GET', { limit: 100 });
            const _filteredFeed = _feed.data.filter(f => { return f.message !== undefined })
            localStorage.setItem("feed", JSON.stringify(_filteredFeed));

            this.log(`Feeds aquired with ${_filteredFeed.length} records (not albums... DATA) `)
        }, "Error getting Joel Young Band posts.");
    }

}

function tryCatch(tryCode, catchError) {
    try { tryCode() }
    catch (error) { this.log(catchError, error) }
}

export default new AuthenticationService();