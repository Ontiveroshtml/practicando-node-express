import express from "express"
import 'dotenv/config'
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})