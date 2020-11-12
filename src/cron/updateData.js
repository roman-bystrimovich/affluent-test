const moment = require('moment');

const db = require('../db');
const StatsRepository = require('../repositories/stats');
const AffluNet = require('../services/afflu.net');

(async () => {
    const connection = await db.connect();
    const repo = new StatsRepository(connection);

    const service = new AffluNet();
    const tables = await service.getTables();

    for await (let data of tables) {
        const formattedData = data.map(row => ({
            date: moment.utc(row.date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
            commissions_total: parseFloat(row.commissions_total.substring(1).replace(',','')),
            sales_net: parseInt(row.sales_net.replace(',','')),
            leads_net: parseInt(row.leads_net.replace(',','')),
            clicks: parseInt(row.clicks.replace(',','')),
            epc: parseFloat(row.epc.substring(1).replace(',','')),
            impressions: parseFloat(row.impressions.replace(',','')),
            cr: parseFloat(row.cr.replace('%',''))
        }));

        await repo.createMany(formattedData);
    }

    await db.disconnect();
})();
