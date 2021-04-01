const knex = require('knex')

const pool_information = require('./db_config');    
const {user, host, database, password} = pool_information.pool_info;

const db = knex({
    client: 'pg',
    connection: {
        host,
        user,
        password,
        database
    }
})
module.exports = db;