import pool from "./config.js"

const result = await pool.query("SELECT NOW()")
console.log(result.rows)