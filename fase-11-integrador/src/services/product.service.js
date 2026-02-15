import pool from "../config/db.js";

export const createProductService = async (name, price) => {

    
    const result = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    )

    return result.rows[0]

}