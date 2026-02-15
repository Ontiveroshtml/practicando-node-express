import express from "express"
import { login, register } from "../controllers/auth.controller.js"
import { authMiddleware, registerValidations } from "../middleware/authValidations.js"

const router = express.Router()

router.post("/register", registerValidations, register)
router.post("/login", login)


export default router