import express from 'express'
import { authMiddleware } from '../middleware/authValidations.js'
import { createProduct } from '../controllers/product.controller.js'

const router = express.Router()


router.post("/", authMiddleware, createProduct)

export default router