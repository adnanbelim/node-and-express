const express = require('express');
const app = express();
const dotenv = require('dotenv');
const con = require('./connection');
const path = require('path');
const ejs = require('ejs');
app.set('view engine', 'ejs');





// for get object from browser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //get data as json format from web
app.use(bodyParser.urlencoded({ extended: true }));

// OR=================================================>

// app.use(express.json());  // it is give only object without value so we used body parser

// Set Routing =======================================>

const dirpath = path.join(__dirname, '/register.html')

app.get('/', (req, res) => {
    res.sendFile(`${dirpath}`);
});

// To get data from Form ===============================>

app.post('/', (req, res) => {
    // console.log(req.body);

    let name = req.body.name;
    let email = req.body.email;

    con.connect((err, result) => {
        // if(err) throw error;
        let qry = "INSERT INTO user (name, email) VALUES('" + name + "','" + email +"')";
        con.query(qry, (err, result) => {
            if (err) throw error;
            // res.send("User Register Successfully!!" + result.insertId); //insertId is predifined 
            res.redirect('/student');
        });

        // second way to insert...

        // let qry = "INSERT INTO user (name, email) VALUES(?, ?)";
        // con.query(qry,[name, email], (err, result) => {
        //     if (err) throw error;
        //     res.send("User Register Successfully!!" + result.insertId); //insertId is predifined 
        // });

        // third way to insert...

        // let qry = "INSERT INTO user (name, email) VALUES ?";
        // let data = [ [name, email] ];
        // con.query(qry, [data] , (err, result) => {
        //     if (err) throw error;
        //     res.send("User Register Successfully!!" + result.insertId); //insertId is predifined 
        // });
        
        
    })
});



// To get data from Form =================================>

app.get('/student', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "select * from user";
        con.query(qry, (err, result) => {
            if (err) throw error;
            res.render(__dirname + '/student', { user: result });
        })
    })
});

// delete data =============================================>

app.get('/delete', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "delete from user where id = ?";
        let del = req.query.id;

        con.query(qry, [del], (err, result) => {
            if (err) throw error;
            res.redirect('/student');
        })
    })
});


// Update Query================================================>
// const updatePath = path.join(__dirname, 'views');
app.get('/update', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "select * from user where id = ?";
        let upd = req.query.id;

        con.query(qry, [upd], (err, result) => {
            if (err) throw error;
            res.render(__dirname + '/update-form', {user:result});
        })
    })
});

// after submit update request we will post iit

app.post('/update', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let name = req.body.name;
        let email = req.body.email;
        let id = req.body.id;

        let qry = "UPDATE user SET name = ?, email = ? where id = ?";

        con.query(qry, [name, email, id], (err, result) => {
            if (err) throw error;
            res.redirect('/student');
        })
    })
});

// searching student=====================================>

app.get('/search', (req, res) => {
    
    var name = req.query.name;
    var email = req.query.email;
    
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "select * from user where name LIKE '%" + name + "%' AND email LIKE '%" + email +"%' ";
        con.query(qry, (err, result) => {
            if (err) throw error;
            res.render(__dirname + '/student', { user: result });
        })
    })
});


// PORT==========================================================>
dotenv.config(); // configure env (environment variable)
const PORT = process.env.PORT || 5000; // env use

app.listen(PORT, (err) => {
    if (err) throw error;
    console.log(`server run on ${PORT}`);
});