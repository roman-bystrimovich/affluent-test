const mysql = require('mysql2/promise');

let pool;

exports.connect = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'affluent',
            password: 'shumer88',
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
