import express from 'express'
import { addTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/task.controller.js'

const router = express.Router()

router.get("/", getAllTasks)
router.get("/:id", getTaskById)
router.post("/", addTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router