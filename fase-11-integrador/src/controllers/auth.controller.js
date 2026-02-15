import { createUserService, loginService } from "../services/auth.service.js"

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body

    const user = await createUserService(email, password, role)

    res.status(201).json({ message: "Usuario creado correctamente", data: user })
  } catch (err) {
    res.status(500).json({ message: "Error al registrar un usuario", Error: err })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const token = await loginService(email, password)

    res.status(200).json({ token })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

