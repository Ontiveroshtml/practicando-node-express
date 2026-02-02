import express from "express"
import { createTask, getAllTask } from "../controllers/tasks.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()


router.get("/", authMiddleware, getAllTask)
router.post("/", authMiddleware, createTask)

export default router