const path = require('path');
const express = require('express');

const db = require('../db');
const UsersController = require('./controllers/users');
const StatsController = require('./controllers/stats');

exports.app = null;

exports.start = async () => {
    const connection = await db.connect();

    const app = express();

    app.use(express.static(path.resolve(__dirname, '../web')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../web/index.html'));
    });

    app.get('/users', async (req, res) => {
        const ctrl = new UsersController(connection);
        const users = await ctrl.getList();
        res.json(users);
    });

    app.get('/stats', async (req, res) => {
        const ctrl = new StatsController(connection);
        const stats = await ctrl.getList();
        res.json(stats);
    });

    app.all('*', (req, res) => {
        res.send('Page is not found');
    });

    app.listen(8000, () => {
        console.log('server started');
    });

    exports.app = app;
}

exports.stop = async () => {
    if (exports.app && exports.app.close) {
        exports.app.close();
        exports.app = null;
    }
    await db.disconnect();
    console.log('server closed');
};

(async () => {
    if (require.main === module) {
        process.once('SIGTERM', () => {
            exports.stop();
        });

        process.once('SIGINT', () => {
            exports.stop();
        });

        await exports.start();
    }
})();
