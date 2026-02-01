import pool from "../config/db.js"

const clientsValidation = async (req, res, next) => {
  const clientId = Number(req.params.id)
  const name = req.body.name

  if (isNaN(clientId) || clientId <= 0) {
    return res.status(400).json({ message: "ID cliente invalido" })
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Formato de nombre invalido" })
  }

  const client = await pool.query(
    "SELECT * FROM clients WHERE id = $1",
    [clientId]
  )

  if (client.rowCount === 0) {
    return res.status(404).json({ message: 'Cliente no encontrado' })
  }

  next()
}

export default clientsValidation