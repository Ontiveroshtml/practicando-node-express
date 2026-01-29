require("dotenv").config()
const http = require("node:http");

const port = process.env.PORT || 3000
const msg = process.env.MENSAJE

const server = http.createServer((req, res) => {
  if (req.url === "/config") {
    res.setHeader("Content-Type", 'application/json')
    res.end(JSON.stringify({ port: port, mensaje: msg }))
  }else{
    res.statusCode = 404
    res.end('Ruta no encontrada')
  }
})


server.listen(port, () => {
  console.log(`servidor corriendo en http://localhost:${port}`)
})