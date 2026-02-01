import express from 'express';
import 'dotenv/config'
import handleError from './middleware/handleError.js';
import clientsRoutes from './routes/clients.route.js'
import productsRoutes from './routes/products.route.js'
import ordersRoutes from './routes/orders.route.js'

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use("/clients", clientsRoutes)
app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)

app.use(handleError)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})