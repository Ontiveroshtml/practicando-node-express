//test
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const rol = req.user.rol

    if (rol !== 'admin') {
      return res.status(403).json({ message: "No tienes permisos" })
    }

    res.status(200).json({ message: "Hola admin" })

  } catch (err) {
    next(err)
  }
})

export default router