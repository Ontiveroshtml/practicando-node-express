import express from "express"
import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from "../controllers/users.controllers.js"

const router = express.Router()

router.get("/", getAllUsers)

router.get("/user/:id", getUserById)

router.post("/agregar", registerUser)


router.put("/actualizar/:id", updateUser)

router.delete("/eliminar/:id", deleteUser)

export default router