const AffluNet = require('../services/afflu.net');

(async () => {
    const service = new AffluNet();

    const tables = await service.getTables();

    for await (let data of tables) {
        console.log(data);
    }
})();
