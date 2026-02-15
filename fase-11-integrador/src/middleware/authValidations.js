import pool from "../config/db.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const registerValidations = async (req, res, next) => {
  try {
    let { email, password, role } = req.body

    //Normaliza email
    email = email?.trim().toLowerCase()

    //Formato de email y password con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/

    //verifica si email, password y rol cumplen con el formato requerido
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email incorrecto" })
    }

    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({ message: "La contraseña debe tener mayusculas, minusculas, numeros y al menos 6 caracteres" })
    }

    if (!role || (role !== 'admin' && role !== 'user')) {
      return res.status(400).json({ message: "El rol debe ser admin o user" })
    }

    //Verifica sino existe el correo antes de registrarlo
    const result = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    )

    if (result.rowCount > 0) {
      return res.status(400).json({ message: "Este correo ya existe" })
    }

    //Si todo sale bien aplica el normalize de email
    req.body.email = email

    next()
  } catch (err) {
    res.status(500).json({ message: "algo salio mal al validar", Error: err })
  }
}

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ message: "Token requerido" })
  }

  try {
    const token = header.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET)

    req.user = decoded

    next()
  } catch (err) {
    res.status(401).json({ message: "Token invalido", Error: err })
  }

}


