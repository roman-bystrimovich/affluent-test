const db = require('../../db');
const StatsRepository = require('../../repositories/stats');

class Stats {
    constructor(db) {
        this.repository = new StatsRepository(db);
    }

    async getList() {
        return await this.repository.readList();
    }
}

module.exports = Stats;
