const Pool = require("pg").Pool;
require("dotenv").config();
//const config = require('../config.json')


// const db = new Pool({
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE
// });

// const db = new Pool({
//     user: config.USER,
//     password: config.PASSWORD,
//     host: config.HOST,
//     port: config.PORT,
//     database: config.DATABASE
// });
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const db = new Pool({
    connectionString:
        process.env.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;