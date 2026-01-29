import express from 'express';
import 'dotenv/config'
import usersRouter from './routes/users.routes.js'
import logger from './middleware/logger.js'
import handleError from './middleware/handleError.js';

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(logger)

app.use("/users", usersRouter)

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' })
})

app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} !`)
})
