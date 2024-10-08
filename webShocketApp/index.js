const express = require('express');
const app = express();
// Reslove path of static file
const path = require('path');

// import socket.io as Server variable (3rd party library npm i socket.io)
const { Server } = require("socket.io");

// import module http for running the PORT 
const http = require('http');
const server = http.createServer(app);
// io variable handle all request
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile('./public/index.html')
});

// Connection socket with frontent : this will take one argument name connection and a call back with one parameter
// If message comes from frontent then send everyone (we write this line as code)
io.on('connection', (socket) => {
    // console.log('a new user connected', socket.id);
    socket.on("user-message", (message) => {
        // console.log("A new user messaged", message);
        // take message from frontend and again send message to frontent
        io.emit("message", message);
        
    })
});
// this method upgrade connection and give a unique id after this we handle socket as well in frontend

server.listen(9000, () => {console.log('Server running on POrt 9000')
});