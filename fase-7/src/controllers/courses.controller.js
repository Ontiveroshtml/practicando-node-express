
import pool from "../config/db.js"

export const getAllCourses = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT title FROM courses")

    res.status(200).json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const getCoursesById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id) || id <= 0) {
      res.status(400).json({ message: "ID invalido" })
    }

    const result = await pool.query(
      `
      SELECT courses.title AS course_name
      FROM courses
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE enrollments.student_id = $1
      `, [id]
    )

    res.status(200).json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const addCourse = async (req, res, next) => {
  try {
    const title = req.body.title

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Formato del titulo invalido" })
    }

    const result = await pool.query(
      "INSERT INTO courses (title) VALUES ($1) RETURNING *",
      [title.trim().toUpperCase()]
    )

    res.status(201).json({ message: "Curso agregado correctamente", result: result.rows[0] })

  } catch (err) {
    next(err)
  }
}