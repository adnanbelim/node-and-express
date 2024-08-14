const express = require('express');
const con =  require('./config');
const app =  express();

// get data from postman
app.use(express.json());

app.get('/', (req, res) => {
    con.query("SELECT * FROM user", (err, result) => {
        if (err) {
            res.send("Query is wronf");
        }
        else {
            res.send(result);
        }
    })
})

// insert (POST) static data...

// app.post('/', (req, res) => {
//     const data = {name: "test2", email : "test2@gmail.com"}
//     con.query("INSERT INTO user SET ?", data, (err, result, fields) => {
//         if(err) error; //throw error (script method)
//         res.send(result);
//     })
// })

// insert data by postman...

app.post('/', (req, res) => {
    const data = req.body;
    con.query("INSERT INTO user SET ?", data, (err, result, fields) => {
        if(err) throw error; //throw throw error (script method)
        res.send(result);
    });
});

//Update data static

// app.put('/', (req, res,) => {
//     con.query("UPDATE user SET name = 'test3', email = 'test3@gmail.com'", (err, result, fields) => {
//         if (err) throw error; //throw throw error (script method)
//         res.send(result);
//     });
// });

//update data dynamic (Postman - API)

app.put('/:id', (req, res,) => {
    const data = [req.body.name, req.body.email, req.params.id];
    con.query("UPDATE user SET name = ?, email = ? where id = ?", data, (err, result, fields) => {
        if (err) throw error; //throw error (script method)
        res.send(result);
    });
});

app.delete('/:id', (req, res) => {
    con.query("DELETE FROM user WHERE id = " + req.params.id, (err, result) => {
        if(err) throw error;
        res.send(result);
    })
})

app.listen(9000);