const knex = require('knex')

const pool_information = require('./db_config');    
const {user, host, database, password} = pool_information.pool_info;

// console.log('db_information', user, host, password, database)
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