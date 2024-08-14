// middleware use to filter response and request for authotication

const express = require('express');
const reqFilter = require('./middleware');
const app = express();
const route = express.Router();

route.use(reqFilter);

route.get('/', (req, res) => {
    res.send('This is Home Page');
});
route.get('/users', (req, res) => {
    res.send('This is Users Page');
});
app.get('/about', (req, res) => {
    res.send('This is Users Page');
});
app.get('/admin', (req, res) => {
    res.send('This is Users Page');
});

app.use('/', route);
app.listen(9000);