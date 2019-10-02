class Api {
    baseUrl = 'http://localhost:59699';
    tenantExternalId = '3cef4f0a-c43a-445d-a5d8-40ba8caf9df8';
    token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IkZDNkVGODUxMEZBREE5QjIwM0VEMEIwRTdDRjUxODU2MURCQ0I0NDAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJfRzc0VVEtdHFiSUQ3UXNPZlBVWVZoMjh0RUEifQ.eyJuYmYiOjE1Njk5ODY3ODAsImV4cCI6MTU3MDAwMTE4MCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eXFhLnZpdGFwb3dlcmVkLmNvbS9pZGVudGl0eSIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5cWEudml0YXBvd2VyZWQuY29tL2lkZW50aXR5L3Jlc291cmNlcyIsImFwQXNzaWdubWVudEFwaSIsImF1dGhvcml6YXRpb25BcGkiLCJpbXNBcGkiLCJwc2lfdHRfaWRlbnRpdHlfYXBpIiwidGVuYW5jeUFwaSIsInVzZXJhZG1pbiJdLCJjbGllbnRfaWQiOiJhdHNfYXRwX2NsaWVudCIsInNjb3BlIjpbImFwQXNzaWdubWVudEFwaSIsImF1dGhvcml6YXRpb25BcGkiLCJpbXNBcGkiLCJwc2lfdHRfaWRlbnRpdHlfYXBpIiwidGVuYW5jeUFwaSIsInVzZXJhZG1pbiJdfQ.N-qUrJMt3kaFlGrvd522XzAIU0EQz8ekmWKqhXHwvJI4WjBKZDXRzPUXGOM0l89DW-HBXGV9KY1KWVF8xM6gv89hOUsvteo0b5xOPjkj0EsSrtXewOfmCSp9b-S1ruFFcwXVnTm4g-f1byJvmvy_dj4KK80xkUvY7qjjTaVwIW-Id8jsjA51qg9jS5EfU_UMxKsOBi-qy58VoxUWzpUV9kkB2rcvMpd5-2WcbLqxviLosSybZ-Mm-eMnXLtzd71k13XD61aoJ5fH0F1vxUWaNu7uDqkvOruo_8EL2cCLpymLY0FptR4s32ma5lLGYlyInfyX-DiIv0AD2aH-319H2w"    

    fetch(route, options) {
        options = options || {};
        let method = options.method || 'GET';
        return fetch(`${this.baseUrl}/api/1/${this.tenantExternalId}/${route}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'pragma': 'no-cache',
                // 'cache-control': 'no-cache',
                'Authorization': this.token,
            },
            ...options,
            method: method
        })
            .then(res => {
                if (!res.ok)
                    throw Error(res.statusText);
                return res.json();
            })
            .catch(e => console.log(e));
    }

    async fetchAndStoreToken() {
        fetch(`${this.baseUrl}/api/token`)
            .then(res => {
                if (!res.ok)
                    throw Error("Error retrieving token")
                return res.json();
            })
            .then(data => { this.token = data; console.log(data) });
    }
}

export default new Api();