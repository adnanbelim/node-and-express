const mysql = require('mysql');
const {HOST, USER, PASS, DB} = process.env;
const con = mysql.createConnection({
    host : HOST,
    user : USER,
    password : PASS,
    database : DB
});
con.connect((err, res) => {
    if(err) throw err;
    console.log("Database Connected");
})
module.exports = con;