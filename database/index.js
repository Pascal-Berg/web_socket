const db = require('./database');

module.exports = {
    createDB: function () {
        db.query(
            'CREATE TABLE if not exists entries ' +
                '( id SERIAL PRIMARY KEY UNIQUE, ' +
                'username varchar(16)  NOT NULL, ' +
                'entry varchar(511) NOT NULL );'
        );
    },
    create: function (data) {
        const query = {
            name: 'create-entry',
            text: 'INSERT INTO entries (username, entry) VALUES ($1,$2)',
            values: [data.username, data.entry],
        };

        return new Promise((resolve, reject) => {
            db.query(query, function (err) {
                if (err) {
                    reject(err.toString());
                }
                resolve();
            });
        });
    },
    read: function () {
        const query = {
            name: 'fetch-user',
            text: 'SELECT * FROM entries',
        };
        return new Promise((resolve, reject) => {
            db.query(query, (err, res) => {
                if (err) {
                    reject(err.detail);
                } else {
                    resolve(res.rows);
                }
            });
        });
    },
};
