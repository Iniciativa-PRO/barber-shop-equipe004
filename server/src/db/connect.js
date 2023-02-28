const Mysql = require('sequelize'); 
const dotenv = require('dotenv/config'); 

const mysql = new Mysql(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
       dialect: 'mysql',
       host: process.env.DB_HOST,
    }
);

module.exports = mysql;
