const http = require('http'); //require http protocol for req res clien and server
const data = require('./apidata.js'); //Import api data
http.createServer((req, resp) => {  //take parameter as function
    resp.writeHead(200, {'content-Type':'application/json'});  //api header : content type json....
    resp.write(JSON.stringify(data)); //api body : (first is status code and second is api data)
    resp.write(" I can add more than 1 data through module.exports on other page...");
    resp.end();
}).listen(3000);


// Informational responses(100 – 199)
// Successful responses(200 – 299)
// Redirection messages(300 – 399)
// Client error responses(400 – 499)
// Server error responses(500 – 599)