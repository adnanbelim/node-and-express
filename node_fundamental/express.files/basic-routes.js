const express = require('express'); //require
const app = express();              //execute

// Make routes by Get method...

app.get('', (req, res) => {
    res.send('this is home page');
});

app.get('/about', (req, res) => {
    res.send('ABout page');
});

app.get('/help', (req, res) => {
    res.send('help page');
});

app.listen(9000);

// HTML and JSON render in Routes

app.get('/html', (req, res) => {
    res.send(`<h1>Hello It's HTML code</h1>
        
        //query params (humne about page par ek parameter send kiya hai like about?name=adnan)
        <input typ='text' placeholder='user name' value='${req.query.name}'/> ` 
    );
})

app.get('/json', (req, res) => {
    res.send([
        {
            name: "Adnan",
            surname: "Belim"
        },
        {
            name: "Aadil",
            surname: "Belim"
        },
    ]);
});

