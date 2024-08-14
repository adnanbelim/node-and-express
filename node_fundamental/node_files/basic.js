// import module
const app = require('./app.js');
console.log(app.z());

// filter function (high order)
let arr = [1,2,3,4,5,6,7,8,9];
let result = arr.filter((item) => {
    return item > 5;
});
console.log(result);

//coremodule
// Global module : jise require karne ki need nahi hoti...
// example : console, path(__dirname, __filename).

// Local module : jise require kita jata hai...
// example : fs etc
const fs = require('fs');
// fs.writeFileSync("abc.txt","hello it is file system");

// third party module : jinhe hum globaly install karte hai...
// example : express, mongo, react, angular

