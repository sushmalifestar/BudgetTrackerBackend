console.log("db.config.js loaded");

require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: 1433,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

console.log("DB_USER =", process.env.DB_USER);
console.log("DB_SERVER =", process.env.DB_SERVER);
console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_PASSWORD exists =", process.env.DB_PASSWORD);
console.log("DB_PASSWORD length =", process.env.DB_PASSWORD?.length);
console.log("DB_SERVER raw =", JSON.stringify(process.env.DB_SERVER));

module.exports = {
    sql,
    config
};