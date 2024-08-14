const express = require('express');
const app = express();

app.get('', (req, res) => {
    res.send("hello we will display/render HTML and JSON");
});

app.get('/about', (req, res) => {
    res.send(`<h1>Hello It's HTML code</h1>
        
        <input typ='text' placeholder='user name' value='${req.query.name}'/> ` //query params (humne about page par ek parameter send kiya hai like about?name=adnan)
        );
})

app.get('/help', (req, res) => {
    res.send([
        {
            name : "Adnan",
            surname : "Belim"
        },
        {
            name: "Aadil",
            surname: "Belim"
        },
    ]);
});

app.listen(9000);