const fs = require('node:fs')

const stream = fs.createReadStream('log.txt', 'utf-8')

stream.on('data', (chunk) => {
  console.log('chunk recibido:')
  console.log(chunk)
  
})

stream.on('end', () => {
  console.log('Se termino de leer el archivo')
})