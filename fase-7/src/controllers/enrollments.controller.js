import pool from "../config/db.js";

export const getAllEnrollment = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT 
      students.name AS student_name,
      courses.title AS course_name
      FROM enrollments
      JOIN students ON enrollments.student_id = students.id
      JOIN courses ON enrollments.course_id = courses.id;
      `
    )

    res.status(200).json(result.rows)

  } catch (err) {
    next(err)
  }
}

export const createEnrollment = async (req, res, next) => {
  try {
    const student_id = Number(req.body.student_id);
    const course_id = Number(req.body.course_id)

    if (isNaN(student_id) || student_id <= 0) {
      return res.status(400).json({ message: "ID del estudiante invalido" })
    }

    if (isNaN(course_id) || course_id <= 0) {
      return res.status(400).json({ message: "ID del curso invalido" })
    }

    const student = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [student_id]
    )

    if (student.rowCount === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" })
    }

    const course = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [course_id]
    )

    if (course.rowCount === 0) {
      return res.status(404).json({ message: "Curso no encontrado" })
    }

    const result = await pool.query(
      "INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [student_id, course_id]
    )

    res.status(201).json({
      message: "Relacion creada correctamente",
      result: result.rows[0]
    })

  } catch (err) {
    next(err)
  }
}