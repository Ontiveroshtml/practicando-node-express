import express from "express"
import 'dotenv/config'
import privateRoutes from "./routes/private.route.js"
import authRoutes from "./routes/auth.routes.js"


const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api', privateRoutes)

app.listen(3000, () => {
  console.log("Servidor corriendo!")
})