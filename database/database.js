const { Pool } = require('pg');
require('dotenv').config();

/*
In connection pooling, after a connection is created, it is placed in the pool and it is used again
so that a new connection does not have to be established.
If all the connections are being used, a new connection is made and is added to the pool.
 */
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

module.exports = {
    query: function (text, params, callback) {
        //run a query on the first available idle client and return its result.
        return pool.query(text, params, callback);
    },
};
