import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/auth.route.js'
import tasksRoutes from './routes/tasks.route.js'
import { handleError } from './middleware/handleError.js'

const app = express()
const port = process.env.PORT
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api', tasksRoutes)

app.use(handleError)

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto", port)
})

