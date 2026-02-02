import pool from "../config/db.js"

export const getAllTask = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT 
      users.email AS user_email,
      tasks.title AS task_title
      FROM tasks 
      JOIN users ON tasks.user_id = users.id
      `
    )

    res.status(200).json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const createTask = async (req, res, next) => {
  try {
    const userId = req.body.user_id
    let title = req.body.title

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: "Formato ID invalido" })
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Formato titulo invalido" })
    }

    title = title.trim().toLowerCase()

    const userExist = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    )

    if (userExist.rowCount === 0) {
      return res.status(404).json({ message: "El usuario no existe" })
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, userId]
    )

    res.status(201).json({ message: "Tarea creada correctamente", data: result.rows[0] })

  } catch (err) {
    next(err)
  }
}