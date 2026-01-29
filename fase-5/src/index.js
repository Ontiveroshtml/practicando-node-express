import express from 'express';
import 'dotenv/config';
import tasksRoutes from './routes/task.routes.js'
import handleError from './middleware/handleError.js';

const port = process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use('/tasks', tasksRoutes)

app.use(handleError)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/tasks/`)
})