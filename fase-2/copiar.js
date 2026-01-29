const fs = require('node:fs')

const readStream = fs.createReadStream('log.txt', 'utf8');
const writeStream = fs.createWriteStream('log-copy.txt');

readStream.pipe(writeStream)
const stats = fs.statSync('log-copy.txt');
const size = stats.size

console.log(size)
console.log(size)

