const fs =  require('fs');
const path = require('path');

const dirname =  path.join(__dirname, '/files');
console.log(dirname);

// for(let i = 0; i < 5; i++){
//     fs.writeFileSync(dirname + `/file ${i}.txt`, 'hello it is file' + i);
// }

fs.readdir(dirname,(err, files) => {
    // console.log(files);
    files.forEach((item) => {
        console.log('file name is ' + item );
    })
})