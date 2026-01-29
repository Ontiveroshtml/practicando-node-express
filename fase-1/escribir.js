//escribir

const fs = require('node:fs');

const archivo = 'saludo.txt'

fs.writeFile(archivo, 'Hola, este archivo fue creado con Node', (err) => {
  if (err) return
  console.log('archivo creado!')
})

fs.readFile(archivo, 'utf-8', (err, data) => {
  if (err) return

  console.log(`contenido de ${archivo}: ${data}`)
})

