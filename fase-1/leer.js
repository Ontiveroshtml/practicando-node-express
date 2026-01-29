//leer

const fs = require("node:fs");

fs.readFile('mensaje.txt', 'utf-8', (err, data) => {
  if (err) return 

  console.log(data)
})