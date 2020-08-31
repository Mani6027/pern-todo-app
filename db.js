const Pool = require('pg').Pool;
require('dotenv').config();

// const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.DB_HOST,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// };
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`;


const prodConfig = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? prodConfig : devConfig
});

module.exports = pool;