const fs = require('node:fs/promises');

async function crearArchivo() {
  setInterval(async () => {
    try {
      const ahora = new Date()
      const hora = ahora.getHours()
      const minutos = ahora.getMinutes()
      const segundos = ahora.getSeconds()

      const getTime = `${hora}:${minutos}:${segundos}`

      await fs.appendFile('log.txt', `servidor activo:, ${getTime}\n`)

    } catch (err) {
      console.log('algo salio mal', err)
    }
  }, 3000)
}

crearArchivo()