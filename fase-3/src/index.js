import express from 'express';
import 'dotenv/config'

import inicioRoutes from '../routes/inicio.routes.js'
import sumaRoutes from '../routes/suma.routes.js'
import timeRoutes from '../routes/time.routes.js'
import userRoutes from '../routes/users.routes.js'


const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json());


app.use("/", inicioRoutes);
app.use("/suma", sumaRoutes);
app.use("/time", timeRoutes)
app.use("/user", userRoutes)

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})