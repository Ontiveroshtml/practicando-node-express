import pool from '../config/db.js'

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM products")

    if (result.rowCount === 0) {
      return res.status(204).send()
    }

    res.status(200).json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const name = req.body.name

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Formato del nombre inválido" })
    }

    const result = await pool.query(
      "INSERT INTO products (name) VALUES ($1) RETURNING *",
      [name.trim()]
    )

    res.status(201).json({
      message: "Producto creado correctamente",
      result: result.rows[0]
    })
  } catch (err) {
    next(err)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.id)
    const name = req.body.name

    const result = await pool.query(
      "UPDATE products SET name = $1 WHERE id = $2 RETURNING *",
      [name.trim(), productId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.status(200).json({
      message: "Producto actualizado correctamente",
      result: result.rows[0]
    })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.id)

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.status(200).json({
      message: "Producto eliminado correctamente",
      result: result.rows[0]
    })
  } catch (err) {
    next(err)
  }
}
