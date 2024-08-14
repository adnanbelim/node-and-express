//event emitter means generate the events
//we have events module and events have more different functions like on, once etc...

const express = require('express');
const EventEmitter = require('events');
const app = express();

// for count event
const count = new EventEmitter();

let counting = 0;
count.on('countAPI', () => {
    counting++;
    console.log("API called!!", counting);
})

app.get('/', (rew, res) => {
    res.send("home");
    //event generator
    count.emit("countAPI");
})

app.get('/update', (rew, res) => {
    res.send("update");
})
app.get('/delete', (rew, res) => {
    res.send("delete");
})
app.get('/rename', (rew, res) => {
    res.send("rename");
})

app.listen(9000);