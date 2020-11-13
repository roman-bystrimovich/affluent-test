const mysql = require('mysql2/promise');

const { db } = require('./config');

let pool;

exports.connect = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: db.host,
            user: db.user,
            database: db.name,
            password: db.password,
            waitForConnections: true,
            connectionLimit: 10
        });
    }

    return pool
};

exports.disconnect = async () => {
    if (pool && pool.end) {
        await pool.end();
    }
    pool = null;
};
