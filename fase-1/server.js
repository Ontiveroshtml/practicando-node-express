//server
const http = require('node:http');
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('inicio')
    res.end()
  } else if (req.url === '/about') {
    res.write('acerca de..')
    res.end()
  } else if (req.url === '/archivo') {
    fs.readFile('mensaje.txt', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500
        return console.log('ocurrio un error al leer el archivo')
      }

      res.setHeader('Content-Type', "application/json")
      res.write(JSON.stringify({ content: data, length: data.length }))
      res.end()
    })
  } else {
    res.statusCode = 404
    res.end('Ruta no encontrada')
  }
})

server.listen(3000, 'localhost', () => {
  console.log('servidor corriendo en http://localhost:3000')
})