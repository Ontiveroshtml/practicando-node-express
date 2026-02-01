import pool from "../config/db.js"

export const getAllOrders = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        orders.id,
        clients.name AS client_name,
        products.name AS product_name
      FROM orders
      JOIN clients ON orders.client_id = clients.id
      JOIN products ON orders.product_id = products.id
    `)

    res.status(200).json({ data: result.rows })
  } catch (err) {
    next(err)
  }
}

export const createOrder = async (req, res, next) => {
  try {
    const client_id = Number(req.body.client_id)
    const product_id = Number(req.body.product_id)

    const result = await pool.query(
      "INSERT INTO orders (client_id, product_id) VALUES ($1, $2) RETURNING *",
      [client_id, product_id]
    )

    res.status(201).json({
      message: "Orden creada correctamente",
      result: result.rows[0]
    })
  } catch (err) {
    next(err)
  }
}

export const updateOrder = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id)
    const client_id = Number(req.body.client_id)
    const product_id = Number(req.body.product_id)

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "ID de orden inválido" })
    }

    const result = await pool.query(
      "UPDATE orders SET client_id = $1, product_id = $2 WHERE id = $3 RETURNING *",
      [client_id, product_id, orderId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    res.status(200).json({
      message: "Orden actualizada correctamente",
      result: result.rows[0]
    })

  } catch (err) {
    next(err)
  }
}

export const deleteOrder = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id)

    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [orderId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    res.status(200).json({
      message: "Orden eliminada correctamente",
      result: result.rows[0]
    })

  } catch (err) {
    next(err)
  }
}
