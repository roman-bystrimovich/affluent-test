const { URL } = require('url');
const fetch = require('node-fetch');

class AbstractApi {
    constructor(host) {
        this.host = host;
    }

    async get(path, params = {}) {
        const url = new URL(path, this.host);

        for (let key in params) {
            url.searchParams.append(key, params[key]);
        }

        try {
            const res = await fetch(url.href);
            return await res.json();
        } catch (e) {
            console.log(e);
            throw new Error('The service could not be reached');
        }
    } 

    async post() {
        throw new Error('Method is not implemented');
    }
}

module.exports = AbstractApi;
