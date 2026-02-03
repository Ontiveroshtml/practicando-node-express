import pool from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import 'dotenv/config'

export const register = async (req, res, next) => {
  try {
    let { email, password, rol } = req.body

    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ message: "Formato de email invalido" })
    }

    email = email.trim().toLowerCase()

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe contener mas de 6 caracteres" })
    }

    if (!rol || !rol.trim()) {
      return res.status(400).json({ message: "Formato del rol incorrecto" })
    }

    if (rol !== 'user' && rol !== 'admin') {
      return res.status(400).json({ message: "El rol debe ser admin o user" })
    }

    rol = rol.trim().toLowerCase()

    const existEmail = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    )

    if (existEmail.rowCount > 0) {
      return res.status(409).json({ message: "Este correo ya existe" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      "INSERT INTO users (email, password, rol) VALUES ($1, $2, $3) RETURNING email, rol",
      [email, hashedPassword, rol]
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

    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "El correo no existe" })
    }

    const user = result.rows[0]

    if (email !== user.email) {
      return res.status(401).json({ message: "Las credenciales no coinciden" })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" })
    }

    const payload = {
      id: user.id,
      email: user.email,
      rol: user.rol
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

    res.send({ token })

  } catch (err) {
    next(err)
  }
}