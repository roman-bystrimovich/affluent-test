const db = require('../db');
const UsersRepository = require('../repositories/users');
const ReqresIn = require('../services/reqres.in');

(async () => {
    const connection = await db.connect();
    const repo = new UsersRepository(connection);

    const api = new ReqresIn();
    const pages = await api.getUsers();

    for await (let data of pages) {
        const usersData = data.map(e => Object.assign({}, e, { service: 'reqres.in', origin_id: e.id }));
        await repo.createMany(usersData);
    }

    await db.disconnect();
})();
