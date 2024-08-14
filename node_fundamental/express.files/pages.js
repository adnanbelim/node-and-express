const express = require('express');
const path = require('path');  //for path

const app = express();
const publicPath = path.join(__dirname, 'public'); 
//__dirname for current directory and path.join is method of path liberary to joid path

//static use to load static content/page but it's show file extension
// app.use(express.static(publicPath)); 

// hidden extension of file...
app.get('', (req, res) => {
    res.sendFile(`${publicPath}/index.html`);
});

// View engine set for dynamic website...
app.set('view engine', 'ejs');

app.get('/profile', (req, res) => {
    const user = {
        name : 'adnan belim',
        email : 'belimadnan111',
        number : '123456789',
        skill : ['JS', 'PHP', 'NODE']
    }
    res.render(`profile`, {user});
});

app.get('/login', (req, res) => {
    res.render('login');
})
// ===============send data dynmically==================>>>


app.get('/about', (req, res) => {
    res.sendFile(`${publicPath}/about.html`);
})
app.get('/help', (req, res) => {
    res.sendFile(`${publicPath}/help.html`);
})

// Page 404 Syntax 
app.get('*', (req, res) => {
    res.sendFile(`${publicPath}/page404.html`);
})
app.listen(5000);