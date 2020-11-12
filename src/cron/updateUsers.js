const ReqresIn = require('../services/reqres.in');

(async () => {
    const api = new ReqresIn();

    const pages = await api.getUsers();

    for await (let page of pages) {
        console.log(page);
    }
})();
