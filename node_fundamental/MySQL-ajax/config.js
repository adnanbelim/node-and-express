const mysql = require('mysql');
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test'
});

con.connect((err, result) => {
    if(err) throw error;
    console.log("server on");
});

module.exports = con;