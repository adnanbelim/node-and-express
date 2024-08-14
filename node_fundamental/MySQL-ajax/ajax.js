const express = require('express');
const app = express();
const con = require('./config'); // Assuming this file contains your MySQL connection setup
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const ejs = require('ejs');
app.set('view engine', 'ejs');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const filePath = path.join(__dirname, 'public');

//server your on register.html page
app.get('/', (req, res) => {
    res.sendFile(`${filePath}/register.html`);
});

// Handle form submission
app.post('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    con.connect((err) => {
        // if (err) throw err;
        let qry = "INSERT INTO user (name, email) VALUES ?";
        let values = [[name, email]];

        con.query(qry, [values], (err, result) => {
            if (err) throw err;
            res.send('Data inserted successfully');
        });
    });
});

// select query =================================>

app.get('/student', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "select * from user";
        con.query(qry, (err, result) => {
            if (err) throw error;
            res.render(filePath + '/student', { user: result });
        })
    })
});

//delete query using ajax

app.get('/delete', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "delete from user where id = ?";
        let del = req.query.id;

        con.query(qry, [del], (err, result) => {
            if (err) throw error;
            res.send('deleted');
        })
    })
});

//update query using ajax

app.get('/update', (req, res) => {
    con.connect((err, result) => {
        // if(err) throw error;

        let qry = "SELECT * FROM user WHERE id = ?";
        let uid = req.query.id;

        con.query(qry, [uid], (err, result) => {
            if (err) throw error;
            res.render(`${filePath}/update`, {user:result});
        });
    });
});

app.post('/update', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;

    con.query("UPDATE user SET name = ?, email = ? WHERE id = ?", [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
        } else {
            res.send('Data updated successfully');
        }
    });
});

// searching student=====================================>

// app.get('/search', (req, res) => {

//     var name = req.query.name;
//     var email = req.query.email;

//     con.connect((err, result) => {

//         let qry = "select * from user where name LIKE '%" + name + "%' AND email LIKE '%" + email + "%' ";
//         con.query(qry, (err, result) => {
//             if (err) throw error;
//             res.render(result);
//         })
//     })
// });

app.get('/search', (req, res) => {
    var name = req.query.name;
    var email = req.query.email;

    con.query("SELECT * FROM user WHERE name LIKE ? AND email LIKE ?", ['%' + name + '%', '%' + email + '%'], (err, result) => {
        if (err) {
            console.error('Error searching user:', err);
            res.status(500).send('Error searching user');
        } else {
            res.json(result);
        }
    });
});



// Start the server
dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
