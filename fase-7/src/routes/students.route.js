import express from 'express'
import { getAllStudents, registerStudent, updateStudent } from '../controllers/students.controller.js'

const router = express.Router()

router.get("/", getAllStudents)
router.post("/", registerStudent)
router.put("/:id", updateStudent)

export default router