const express = require('express');
const app = express();
const con = require('./Routes/config');
const ejs = require('ejs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine and views path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// All basic routes create in pages.js
app.get('/', (req, res) => {
    con.query("SELECT * FROM products WHERE status = 1", (err, results) => {
        if (err) {
            console.warn(err);
            //render an error page
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('home', { products: results });
    });
});

// Route to add a product 
app.get('/add', (require('./Routes/pages')));

app.get('/user', (require('./Routes/pages')))

app.get('/register', (require('./Routes/pages')))

app.get('*', (require('./Routes/pages')))

// Route to add a product (POST)
app.post('/add', (req, res) => {
    const { name, price } = req.body;
    con.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], (err, result) => {
        if (err) {
            console.warn(err);
            res.status(500).send('Error adding product');
            return;
        }
        res.redirect('/'); // Redirect to home page after successful insertion
    });
});

// Route to delete product
app.get('/delete', (req, res) => {

    let id = req.query.id;

    con.query("UPDATE products SET status = 2 WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.warn(err);
            res.status(500).send('Error adding product');
            return;
        }
        res.redirect('/'); // Redirect to home page after successful insertion
    });
});

app.get('/update', (req, res) => {
    let id = req.query.id;
    con.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.warn(err);
            res.status(500).send('Error adding product');
            return;
        }
        res.render('update', { products: result }); // Redirect to home page after successful insertion
    });
});

app.post('/update', (req, res) => {
    let name = req.body.name;
    let price = req.body.price
    con.query("UPDATE products SET name = ?, price = ?", [name, price], (err, result) => {
        if (err) {
            console.warn(err);
            res.status(500).send('Error adding product');
            return;
        }
        res.redirect('/'); // Redirect to home page after successful update
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
