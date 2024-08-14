const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

con.connect((err) => {
    if (err) {
        console.warn("Not Connected");
    }
    else {
        console.log("connected succesfully");
    }
});

module.exports = con;


