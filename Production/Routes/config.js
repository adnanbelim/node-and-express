const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();
const con = mysql.createConnection({
    host: process.env.DATABASE_host,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_password,
    database: process.env.DATABASE
});

con.connect((err, result) => {
    if (err) throw error;
    console.log("Database Connected");
});

module.exports = con;
