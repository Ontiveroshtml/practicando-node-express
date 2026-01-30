import express from 'express'
import 'dotenv/config'
import handleError from './middleware/handleError.js'
import studentsRoutes from './routes/students.route.js'
import coursesRoutes from './routes/courses.route.js'
import enrollmentsRoutes from './routes/enrollments.route.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//rutas
app.use("/students", studentsRoutes)
app.use("/courses", coursesRoutes)
app.use("/enrollments", enrollmentsRoutes)

//middleware error
app.use(handleError)


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`)
})