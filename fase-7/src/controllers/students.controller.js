import pool from "../config/db.js"

export const getAllStudents = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM students")

    res.status(200).json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const registerStudent = async (req, res, next) => {
  try {
    const name = req.body.name

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Formato del nombre invalido" })
    }

    const result = await pool.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING *",
      [name.trim()])

    res.status(201).json({ message: "Estudiante registrado correctamente", result: result.rows[0] })

  } catch (err) {
    next(err)
  }
}

export const updateStudent = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const name = req.body.name

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Formato de ID invalido' })
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Formato del nombre invalido" })
    }

    const result = await pool.query(
      "UPDATE students SET name = $1 WHERE id = $2 RETURNING *",
      [name.trim().toUpperCase(), id])

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Estudiante no registrado" })
    }

    res.status(200).json({
      message: "Informacion actualizada correctamente",
      result: result.rows[0]
    })
  } catch (err) {
    next(err)
  }
}