const fs = require('fs');
var input = process.argv; //argument vector

if(input[2] == 'add'){
    fs.writeFileSync(input[3], input[4])
}
else if(input[2] == 'remove'){
    fs.unlinkSync(input[3])
}
else{
    console.log("Please write right command")
}