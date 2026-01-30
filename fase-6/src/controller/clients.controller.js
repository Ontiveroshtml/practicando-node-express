import pool from '../config/db.js'

export const getAllClients = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM clients")

    res.status(200).json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const addClients = async (req, res, next) => {
  try {
    const name = req.body.name

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Formato incorrecto al ingresar el nombre" })
    }

    const result = await pool.query("INSERT INTO clients (name) VALUES ($1) RETURNING *", [name.trim()])

    res.status(201).json({ message: "Cliente registrado correctamente", resultado: result.rows[0] })
  } catch (err) {
    next(err)
  }
}