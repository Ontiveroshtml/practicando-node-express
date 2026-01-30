import express from 'express'
import { addClients, getAllClients } from '../controller/clients.controller.js'

const router = express.Router()

router.get("/", getAllClients)
router.post("/register", addClients)

export default router