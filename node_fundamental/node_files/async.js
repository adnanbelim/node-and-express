//sync function wait to terminate first code
//async function will not wait for heavy function and they terminate function by priority
//  sync example : PHP
// async example : NODE, JS

console.log("first");

setTimeout(() => {
    console.log("second");
},2000);

console.log("Third");

// Drawback

let a = 10;
let b = 0;

setTimeout(() => {
    b=20;
}, 2000);

console.log(a+b);

// drawback, is not wait for earliar function and give unexpected output
// for ignoring drawback we have promise function let's code 

let x = 10;
let y = 0;

let promisedata = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve(30);
    }),2000;
});

promisedata.then((data) => {
    y = data;
    console.log(x+y);
});


