const {
    AFFLU_NET_EMAIL,
    AFFLU_NET_PASSWORD,
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASSWORD
} = process.env;

module.exports = {
    db: {
        host: DB_HOST || 'localhost',
        user: DB_USER || 'root',
        name: DB_NAME || 'affluent',
        password: DB_PASSWORD || '',
    },
    api: {
        affluNet: {
            email: AFFLU_NET_EMAIL,
            password: AFFLU_NET_PASSWORD
        }
    }
}
