import * as Facebook from 'fb-sdk-wrapper';
import LogDatShit from '../services/logger';
import history from '../services/history';

class AuthenticationService {
    log = LogDatShit.log;
    FB;

    load = async () => {
        if (!this.FB)
            await  this.loadFaceBookSDK();

        await asyncTryCatch(() => this.setStatus(), "Error getting the current user's status.");

        if (this.status().status === "connected") 
            await asyncTryCatch(() => this.setUser(), "Error getting the current users details.");
        
        await asyncTryCatch(() => this.setJYB(), "Error getting JYB details.");
        await asyncTryCatch(() => this.setFeed(), "Error getting JYB news feed.");
        
        return true
    }

    async loadFaceBookSDK() {
        this.log("Loading Facebook SDK v5.0...")

        this.FB = Facebook;
        await asyncTryCatch(() => this.FB.load(), "Error loading the Facebook SDK.");
        await asyncTryCatch(() => this.init(), "Error initializing the the JYB Facebook App.");

        this.log("Successfully loaded Facebook SDK v5.0")
    }

    async init() {
        this.log("Initializing the JYB Facebook App...");

        await this.FB.init({
            appId: "211952919854909", //config.appId
            autoLogAppEvents: true,
            xfbml: true,
            cookie: true,
            version: 'v5.0',
            status: true,
        });

        this.log("Successfully initialized the JYB Facebook App!");
    }

    async setStatus() {
        this.log("Getting current user status...")
        localStorage.clear();

        const _status = await this.FB.getLoginStatus();
        localStorage.setItem("status", JSON.stringify(_status));

        this.log(`User has status of ${_status.status}`)
    }

    async setUser() {
        this.log("Getting user details...")

        const fields = "id, name, email, picture.width(800).height(800)";
        const _user = await this.FB.api("/me", { fields });
        localStorage.setItem("user", JSON.stringify(_user));

        this.log(`User details aquired : `);
        this.log(JSON.stringify(_user))
    }

    async setJYB() {
        this.log("Getting Joel Young Band details...");

        const _accounts = await this.FB.api(`/10157868078424144/accounts`);
        const fields = "about, attire, bio, location, parking, hours, emails, website, picture.width(800).height(800)";
        const _jyb = await this.FB.api(`/${_accounts.data[0].id}`, 'GET', { fields });
        localStorage.setItem("jyb", JSON.stringify(_jyb));

        this.log("Rock 'n Roll! Aquired Joel Young Band details!");
    }

    async setFeed() {
        this.log("Getting Joel Young Band post feed...")

        const _feed = await this.FB.api(`/${this.jyb().id}/feed`, 'GET', { limit: 100 });
        const _filteredFeed = _feed.data.filter(f => { return f.message !== undefined })
        localStorage.setItem("feed", JSON.stringify(_filteredFeed));

        this.log(`Feeds aquired with ${_filteredFeed.length} records (not albums... DATA) `)
    }

    isAuthenticated = () => {
        const _status = JSON.parse(localStorage.getItem("status"));
        const token = _status && _status.authResponse && _status.authResponse.accessToken;
        return !!token;
    };

    status = () => {
        return JSON.parse(localStorage.getItem("status"));
    }

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

    logout = async (callback) => {
        await this.FB.logout(this.token);
        callback && callback();
        history.push('/');
        this.log("User has logged out!")
    }

    login = async (callback) => {
        await this.FB.login();
        callback && callback();
        history.push('/');
        this.log("User has logged in!")
    }

    getRole(id) {
        if (id === "10157868078424144")
            return "admin";
    }

    flattenUser(user) {
        return { ...user, picture: user.picture.data.url };
    }
}

async function asyncTryCatch(tryCode, catchError) {
    try { await tryCode() }
    catch (error) { LogDatShit.log;(catchError, error) }
}

export default new AuthenticationService();