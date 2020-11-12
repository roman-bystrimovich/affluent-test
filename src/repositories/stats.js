class StatsRepository {
    constructor(db) {
        this.table = 'stats';
        this.db = db;
    }

    async readList() {
        const query = `
            SELECT 
                *
            FROM ${this.table}
        `;

        const [rows] = await this.db.query(query);

        return rows;
    }

    createMany(statsData) {
        const stats = statsData.map(({
            date,
            commissions_total,
            sales_net,
            leads_net,
            clicks,
            epc,
            impressions,
            cr
        }) => ([
            date,
            commissions_total,
            sales_net,
            leads_net,
            clicks,
            epc,
            impressions,
            cr
        ])); 

        const vars = stats.map(stat => `(${stat.map(() => '?').join(',')})`).join(',');

        const query = `
            INSERT INTO ${this.table}
                (date, commissions_total, sales_net, leads_net, clicks, epc, impressions, cr)
            VALUES ${vars}
            ON DUPLICATE KEY UPDATE
                commissions_total = VALUES(commissions_total),
                sales_net = VALUES(sales_net),
                leads_net = VALUES(leads_net),
                clicks = VALUES(clicks),
                epc = VALUES(epc),
                impressions = VALUES(impressions),
                cr = VALUES(cr)
        `;

        return this.db.query(query, stats.reduce((acc, stat) => acc.concat(stat), []));
    }
}

module.exports = StatsRepository;
