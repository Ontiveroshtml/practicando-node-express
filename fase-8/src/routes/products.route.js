import express from 'express'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controller/products.controller.js'
import { productUpdateValidation, productDeleteValidation } from '../middleware/productsValidation.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', createProduct)
router.put('/:id', productUpdateValidation, updateProduct)
router.delete('/:id', productDeleteValidation, deleteProduct)

export default router
