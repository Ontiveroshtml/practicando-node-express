import pool from "../db/config.js"

export const getAllUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users")
  res.json(result.rows)
}

export const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'ID invalido' })
    }

    const result = await pool.query("SELECT * FROM users where id = $1", [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' })
    }

    res.json(result.rows[0])
  } catch (err) {
    next(err)
  }
}

export const registerUser = async (req, res, next) => {
  try {
    const { name, active } = req.body
    if (!name || !name.trim()) {
      return res.status(400).json({ mensaje: "Nombre faltante o dato incorrecto" })
    }

    const result = await pool.query(
      "INSERT INTO users (name, active) VALUES ($1, $2) RETURNING *",
      [name.trim(), active ?? false])

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' })
    }

    res.status(201).json(result.rows[0])
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, active } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ mensaje: "ID invalido" })
    }

    if (!name || typeof active !== "boolean") {
      return res.status(400).json({ mensaje: "Datos invalidos" })
    }

    const result = await pool.query(
      "UPDATE users SET name = $1, active = $2 WHERE id = $3 RETURNING *",
      [name.trim(), active, id])

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' })
    }

    res.status(200).json(result.rows[0])

  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'ID invalido' })
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    )

    res.status(200).json({ mensaje: "Usuario eliminado correctamente", usuario: result.rows[0] })

  } catch (err) {
    next(err)
  }
}