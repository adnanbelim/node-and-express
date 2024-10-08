const express = require('express');
const route = express.Router();
const con = require('./config');

// Basic Routes...
route.get('/add', (req, res) => {
    res.render('add');
})

route.get('/user', (req, res) => {
    res.render('user');
})

route.get('/register', (req, res) => {
    res.render('register');
});

route.get('*', (req, res) => {
    res.render(`page404`);
});


module.exports = route;