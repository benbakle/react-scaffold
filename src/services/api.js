class Api {
    fetch(route, options) {
        options = options || {};
        let method = options.method || 'GET';

        return fetch(`http://localhost:59699/api/1.0/${route}`, {
            headers: {
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
            },
            ...options,
            method: method,
        })
            .then(res => res.json())

    }
}

export default new Api();