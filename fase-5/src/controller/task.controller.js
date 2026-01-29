import pool from '../config/db.js'


export const getAllTasks = async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks')
  res.status(200).json(result.rows)
}

export const getTaskById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" })
    }

    const result = await pool.query('SELECT * FROM  tasks WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "La tarea no existe" })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    next(err)
  }
}

export const addTask = async (req, res, next) => {
  try {
    const { title, completed } = req.body

    if (!title.trim() || title === undefined) {
      return res.status(400).json({ message: "Formato del titulo incorrecto" })
    }

    if (completed === undefined || typeof completed !== "boolean") {
      return res.status(400).json({ message: "Formto de completado incorrecto" })
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
      [title.trim(), completed ?? false]
    )

    res.status(201).json({ message: "Tarea creada correctamente", result: result.rows[0] })
  } catch (err) {
    next(err)
  }
}


export const updateTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { title, completed } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalido" })
    }

    const result = await pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title.trim(), completed ?? false, id]
    )

    res.status(200).json({ message: "Tarea actualizada correctamente", tarea: result.rows[0] })

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

  } catch (err) {
    next(err)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" })
    }

    res.status(200).json({ message: "Tarea eliminada correctamente", tarea: result.rows[0] })

  } catch (err) {
    next(err)
  }
}
