import pool from "../config/db.js";

export const getAllClients = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM clients")

    if (result.rowCount === 0) {
      return res.status(204).json({})
    } else {
      res.status(200).json(result.rows)
    }

    console.log('nombre:', result.rows.name)

  } catch (err) {
    next(err)
  }
}

export const createClient = async (req, res, next) => {
  try {
    const name = req.body.name

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Formato del nombre invalido" })
    }

    const result = await pool.query(
      "INSERT INTO clients (name) VALUES ($1) RETURNING *",
      [name.trim()])

    res.status(201).json({
      message: "Cliente registrado correctamente",
      result: result.rows[0]
    })
  } catch (err) {
    next(err)
  }
}

export const updateClient = async (req, res, next) => {
  try {
    const clientId = Number(req.params.id)
    const name = req.body.name

    const result = await pool.query(
      "UPDATE clients SET name = $1 WHERE id = $2 RETURNING *",
      [name.trim(), clientId]
    )

    res.status(200).json({ message: "Cliente actualizado correctamente", result: result.rows[0] })

  } catch (err) {
    next(err)
  }
}

export const deleteClient = async (req, res, next) => {
  try {
    const clientId = req.params.id

    const result = await pool.query(
      "DELETE FROM clients WHERE id = $1 RETURNING *",
      [clientId]
    )

    res.status(200).json({ message: "Cliente eliminado con exito", result: result.rows[0] })

  } catch (err) {

    next(err)

  }
}


