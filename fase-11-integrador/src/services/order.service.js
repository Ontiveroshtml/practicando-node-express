import pool from "../../../fase-8/src/config/db.js"

export const createOrderService = async (userId) => {

  const user = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId]
  )

  if (user.rowCount === 0) {
    return 'El usuario no existe'
  }

  const result = await pool.query(
    "INSERT INTO orders (user_id) VALUES ($1) RETURNING *",
    [userId]
  )

  return result.rows[0]
}