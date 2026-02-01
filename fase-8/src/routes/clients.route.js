import express from 'express'
import { createClient, deleteClient, getAllClients, updateClient } from '../controller/clients.controller.js'
import clientsValidation from '../middleware/clientsValidation.js'

const router = express.Router()

router.get('/', getAllClients)
router.post('/', createClient)
router.put('/:id', clientsValidation, updateClient)
router.delete('/:id', clientsValidation, deleteClient)

export default router