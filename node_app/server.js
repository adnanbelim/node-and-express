const express = require('express');
const app = express();
require('dotenv').config();
const ejs = require('ejs');
const route = require('./route/route');
const path = require('path');
const fileUpload = require('express-fileupload');
const con = require('./config/connection');
const bodyParser = require('body-parser');
const {generateToken, verifyToken} = require('./controllers/jwt'); //import jwt functions
const { sessionMiddleware, checkSession } = require('./controllers/session'); // Import session middleware

app.use(fileUpload());
app.use(sessionMiddleware); // Use session middleware
app.use(checkSession); // Middleware to check each request for session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'upload'))); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/delete', route);
app.get('/update', route);
app.post('/update', route);
app.use('/', route);
app.use('/details', route);
app.use('/profile', route);
app.use('/update', route);
app.use('/register', route);
app.use('/login', route);
app.use('/admin_login', route);
app.use('/logout', route);
app.use('*', route);

// CRUD ===========================================================>
app.post('/update', route);
app.post('register', route);
app.post('/login', route);

// Admin login ======================================================>
app.post('/admin_login', route);

// ========================YAHA HUMARA KHATAM HO GAYA BHAI MATTER=========================================>











// =======================BHAI NICHE PORT HAI========================================>


const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server listen on ${PORT}`);
});

