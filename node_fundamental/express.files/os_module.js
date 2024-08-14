const os = require('os');

console.log(os.hostname());
console.log(os.freemem() / (1024 * 1024 * 1024));
console.log(os.totalmem() / (1024 * 1024 * 1024));
console.log(os.arch());
console.log(os.platform());
console.log(os.userInfo());

// os module give all information about operating system...
