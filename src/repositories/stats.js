class StatsRepository {
    constructor(db) {
        this.db = db;
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
            INSERT INTO stats
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
