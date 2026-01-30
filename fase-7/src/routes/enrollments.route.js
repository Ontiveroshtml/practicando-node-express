import express from 'express'
import { createEnrollment, getAllEnrollment } from '../controllers/enrollments.controller.js'

const router = express.Router()

router.get("/", getAllEnrollment)
router.post("/", createEnrollment)



export default router