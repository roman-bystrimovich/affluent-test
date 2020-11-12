const db = require('../../db');
const UsersRepository = require('../../repositories/users');

class Users {
    constructor(db) {
        this.repository = new UsersRepository(db);
    }

    async getList() {
        return await this.repository.readList();
    }
}

module.exports = Users;
