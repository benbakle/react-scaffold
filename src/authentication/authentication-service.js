import * as Facebook from 'fb-sdk-wrapper';
import LogDatShit from '../services/logger';
import { jyb_admin_ids, jyb_app_id, jyb_facebook_page_id } from './authentication-config.json';

class AuthenticationService {
    log = LogDatShit.log;
    FB;

    load = async () => {
        if (!this.FB)
            await this.loadFaceBookSDK();

        await asyncTryCatch(() => this.setStatus(), "Error getting the current user's status.");

        if (this.isAuthenticated())
            await asyncTryCatch(() => this.setUser(), "Error getting the current users details.");

        await asyncTryCatch(() => this.setJYB(), "Error getting JYB details.");
        // await asyncTryCatch(() => this.setFeed(), "Error getting JYB news feed.");

        return true
    }

    async loadFaceBookSDK() {
        this.log("Loading Facebook SDK v5.0...")

        this.FB = Facebook;
        await asyncTryCatch(() => this.FB.load(), "Error loading the Facebook SDK.");
        await asyncTryCatch(() => this.init(), "Error initializing the the JYB Facebook App.");

        this.log("Successfully loaded Facebook SDK v6.0")
    }

    async init() {
        this.log("Initializing the JYB Facebook App...");

        await this.FB.init({
            appId: jyb_app_id,
            autoLogAppEvents: true,
            xfbml: true,
            cookie: true,
            version: 'v6.0',
            status: true,
        });

        this.log("Successfully initialized the JYB Facebook App!");
    }

    async setStatus() {
        this.log("Getting current user status...")
        localStorage.clear();

        const _status = await this.FB.getLoginStatus();
        // localStorage.setItem("status", JSON.stringify(_status));

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
        if (!this.isAuthenticated() || this.user().role !== "admin")
            return;

        this.log("#### OHHH! AREN'T YOU SPECIAL... YOU GET ADMIN PRIVILAGES!!! ####");
        this.log("Getting Joel Young Band details...");
        const _accounts = await this.FB.api(`/${jyb_facebook_page_id}/accounts`);
        const fields = "about, attire, bio, location, parking, hours, emails, website, picture.width(800).height(800)";
        const _jyb = await this.FB.api(`/${_accounts.data[0].id}`, 'GET', { fields });
        localStorage.setItem("jyb", JSON.stringify(_jyb));

        this.log("Rock 'n Roll! Aquired Joel Young Band details!");
    }

    async setFeed() {
        if (!this.isAuthenticated() || this.user().role !== "admin")
            return;

        this.log("Getting Joel Young Band post feed...")

        const _feed = await this.FB.api(`/${this.jyb().id}/feed`, 'GET', { limit: 100 });
        const _filteredFeed = _feed.data.filter(f => { return f.message !== undefined })
        localStorage.setItem("feed", JSON.stringify(_filteredFeed));

        this.log(`Feeds aquired with ${_filteredFeed.length} records (not albums... DATA) `)
    }

    isAuthenticated = () => {
        return !!window.FB.getAccessToken();
    };

    user = () => {
        let _user = JSON.parse(localStorage.getItem("user"));

        if (!_user)
            return

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
        console.log(callback)
        window.location.href = '/';
        this.log("User has logged out!")
    }

    login = async (callback) => {
        await this.FB.login();
        callback && callback();
        window.location.href = './admin';
        this.log("User has logged in!")
    }

    getRole(id) {
        let _ids = jyb_admin_ids;

        for (let i = 0; i < _ids.length; i++)
            if (_ids[i] === id)
                return "admin";

        return "standard"
    }

    flattenUser(user) {
        return { ...user, picture: user.picture.data.url };
    }
}

async function asyncTryCatch(tryCode, catchError) {
    try { await tryCode() }
    catch (error) { LogDatShit.log(catchError, error) }
}

export default new AuthenticationService();