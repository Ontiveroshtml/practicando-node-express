import express from 'express'
import { addOrder, getAllOrders } from '../controller/orders.controller.js'

const router = express.Router()

router.get("/", getAllOrders)
router.post("/add-order", addOrder )

export default router