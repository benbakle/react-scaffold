class Api {
    fetch(route, options) {
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
            },
            ...options
        })
    }
}

export default new Api();