import pool from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const createUserService = async (email, password, role) => {

  const hashedPassword = await bcrypt.hash(password, 10)

  const result = await pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
    [email, hashedPassword, role]
  )

  return result.rows[0]

}

export const loginService = async (email, password) => {
  const result = await pool.query(
    "SELECT id, email, password, role FROM users WHERE email = $1",
    [email]
  )

  if (result.rowCount === 0) {
    throw new Error("Credenciales inválidas")
  }

  const user = result.rows[0]

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw new Error("Credenciales inválidas")
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1h"
  })

  return token
}
