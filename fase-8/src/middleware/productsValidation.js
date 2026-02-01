import pool from "../config/db.js"

export const productUpdateValidation = async (req, res, next) => {
  const productId = Number(req.params.id)
  const name = req.body.name

  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({ message: 'ID producto inválido' })
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Formato del nombre inválido' })
  }

  const product = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [productId]
  )

  if (product.rowCount === 0) {
    return res.status(404).json({ message: "Producto no encontrado" })
  }

  next()
}

export const productDeleteValidation = async (req, res, next) => {
  const productId = Number(req.params.id)

  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({ message: 'ID producto inválido' })
  }

  const product = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [productId]
  )

  if (product.rowCount === 0) {
    return res.status(404).json({ message: "Producto no encontrado" })
  }

  next()
}
