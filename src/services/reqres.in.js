const Api = require('./helpers/api');

class ReqresIn extends Api {

    constructor(...params) {
        super('https://reqres.in');
    }

    async * getUsers() {
        for (let page = 1, completed = false; !completed; page++) {
            const { data, total_pages } = await this.get('/api/users', { page });

            if (page === total_pages) {
                completed = true;
            }

            yield data;
        }
    }
}

module.exports = ReqresIn;
