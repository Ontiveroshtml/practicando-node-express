import pool from '../config/db.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const register = async (req, res, next) => {
  try {
    let { email, password } = req.body

    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ message: "Formato de email invalido" })
    }

    email = email.trim().toLowerCase()

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe contener mas de 6 caracteres" })
    }

    const existEmail = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    )

    if (existEmail.rowCount > 0) {
      return res.status(409).json({ message: "Este correo ya existe" })
    }

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email",
      [email, password]
    )

    res.status(201).json({ message: "Registrado correctamente", data: result.rows[0] })

  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    const user = result.rows[0]

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "El correo no existe" })
    }

    if (email !== user.email || password !== user.password) {
      return res.status(401).json({ message: "Las credenciales no coinciden" })
    }

    const payload = {
      id: user.id,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

    res.send({ token })

  } catch (err) {
    next(err)
  }
}