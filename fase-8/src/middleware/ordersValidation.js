import pool from "../config/db.js"

export const createOrderValidation = async (req, res, next) => {
  const client_id = Number(req.body.client_id)
  const product_id = Number(req.body.product_id)

  if (isNaN(client_id)) {
    return res.status(400).json({ message: "ID cliente inválido" })
  }

  if (isNaN(product_id)) {
    return res.status(400).json({ message: "ID producto inválido" })
  }

  const client = await pool.query("SELECT * FROM clients WHERE id = $1", [client_id])
  if (client.rowCount === 0) {
    return res.status(404).json({ message: "No se encontró el cliente" })
  }

  const product = await pool.query("SELECT * FROM products WHERE id = $1", [product_id])
  if (product.rowCount === 0) {
    return res.status(404).json({ message: "No se encontró el producto" })
  }

  next()
}

export const updateOrderValidation = async (req, res, next) => {
  const orderId = Number(req.params.id)
  const client_id = Number(req.body.client_id)
  const product_id = Number(req.body.product_id)

  if (isNaN(orderId) || orderId <= 0) {
    return res.status(400).json({ message: "ID de orden inválido" })
  }

  if (isNaN(client_id)) {
    return res.status(400).json({ message: "ID cliente inválido" })
  }

  if (isNaN(product_id)) {
    return res.status(400).json({ message: "ID producto inválido" })
  }

  const client = await pool.query(
    "SELECT * FROM clients WHERE id = $1",
    [client_id]
  )

  if (client.rowCount === 0) {
    return res.status(404).json({ message: "Cliente no encontrado" })
  }

  const product = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [product_id]
  )

  if (product.rowCount === 0) {
    return res.status(404).json({ message: "Producto no encontrado" })
  }
  
  const order = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId])
  if (order.rowCount === 0) {
    return res.status(404).json({ message: "No se encontró la orden" })
  }

  next()
}

export const deleteOrderValidation = async (req, res, next) => {
  const orderId = Number(req.params.id)

  if (isNaN(orderId) || orderId <= 0) {
    return res.status(400).json({ message: "ID de orden inválido" })
  }

  const order = await pool.query(
    "SELECT * FROM orders WHERE id = $1",
    [orderId]
  )

  if (order.rowCount === 0) {
    return res.status(404).json({ message: "order no encontrado" })
  }

  next()
}
