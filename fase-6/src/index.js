import express from 'express'
import 'dotenv/config'
import clientsRoutes from "./routes/clients.routes.js"
import ordersRoutes from "./routes/orders.routes.js"

import handleError from './middleware/handleError.js'

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/clients', clientsRoutes)
app.use('/orders', ordersRoutes)


app.use(handleError)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`)
})