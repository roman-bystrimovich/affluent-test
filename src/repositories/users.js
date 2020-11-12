class UsersRepository {
    constructor(db) {
        this.db = db;
    }

    createMany(usersData) {
        const users = usersData.map(({
            service,
            origin_id,
            email,
            first_name,
            last_name,
            avatar
        }) => ([
            service || 'unknown',
            origin_id || null,
            email || '',
            first_name || '',
            last_name || '',
            avatar || ''
        ])); 

        const query = `
            INSERT INTO users
                (service, origin_id, email, first_name, last_name, avatar)
            VALUES ${users.map(user => `(${user.map(() => '?').join(',')})`).join(',')}
            ON DUPLICATE KEY UPDATE
                email = VALUES(email),
                first_name = VALUES(first_name),
                last_name = VALUES(last_name),
                avatar = VALUES(avatar)
        `;

        return this.db.query(query, users.reduce((acc, user) => acc.concat(user), []));
    }
}

module.exports = UsersRepository;
