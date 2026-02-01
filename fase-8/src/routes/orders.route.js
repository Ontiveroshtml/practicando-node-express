import express from 'express'
import { createOrder, deleteOrder, getAllOrders, updateOrder } from '../controller/orders.controller.js'
import { createOrderValidation, deleteOrderValidation, updateOrderValidation } from '../middleware/ordersValidation.js'

const router = express.Router()

router.get("/", getAllOrders)
router.post("/", createOrderValidation, createOrder)
router.put("/:id", updateOrderValidation, updateOrder)
router.delete("/:id", deleteOrderValidation, deleteOrder)


export default router