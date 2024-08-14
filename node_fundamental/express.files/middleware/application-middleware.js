// middleware use to filter response and request for authotication

const express = require('express');
const reqFilter = require('./middleware');

const app = express();

app.use(reqFilter);

app.get('/', (req, res) => {
    res.send('This is Home Page');
});
app.get('/users', (req, res) => {
    res.send('This is Users Page');
});
app.listen(9000);