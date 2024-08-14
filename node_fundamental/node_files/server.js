// Create Server
// HTTP module : request and response handler

const http = require('http');
http.createServer((req, res) =>{
    res.write("<h1>hello this is adnan</h1>");
    res.end();
}).listen(4500); 