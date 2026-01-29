const fs = require('node:fs/promises');

async function leerArchivo() {
  try {
    const data = await fs.readFile('notas.txt', 'utf8'); //Lee el archivo
    console.log(data)
  } catch (err) {
    await fs.writeFile('notas.txt', 'creando nota desde node!') //Si no existe lo crea, hay que ejecutar de nuevo para leerlo
  }
}

leerArchivo()
