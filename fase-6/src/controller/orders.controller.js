import pool from "../config/db.js"

export const getAllOrders = async (req, res, next) => {
  try {

    const orderClient = await pool.query(
      `SELECT 
        orders.id,
        orders.product,
        orders.price,
        clients.name AS Client_Name
        FROM orders
        JOIN clients ON orders.client_id = clients.id
      `
    )

    res.status(200).json(orderClient.rows)
  } catch (err) {
    next(err)
  }
}

export const addOrder = async (req, res, next) => {
  try {
    const product = req.body.product
    const price = Number(req.body.price)
    const client_id = Number(req.body.client_id)

    const client = await pool.query(
      "SELECT * FROM clients WHERE id = $1",
      [client_id]
    )

    if (client.rowCount === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    if (!product || !product.trim()) {
      return res.status(400).json({ message: "Formato incorrecto al ingresar el producto" })
    }

    if (isNaN(price)) {
      return res.status(400).json({ message: "Formato incorrecto al ingresar el precio" })
    }

    if (isNaN(client_id)) {
      return res.status(400).json({ message: "ID invalido" })
    }

    const result = await pool.query(
      "INSERT INTO orders (product, price, client_id) VALUES ($1, $2, $3) RETURNING *",
      [product.trim(), price, client_id]
    )


    res.status(201).json({ message: "Orden creada correctamente", registro: result.rows[0] })

  } catch (err) {
    next(err)
  }
}