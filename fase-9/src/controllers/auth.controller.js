import jwt from "jsonwebtoken"
import 'dotenv/config'

const fakeUser = {
  id: 1,
  email: "test@mail.com",
  password: "123456"
}

export const login = (req, res) => {
  try {
    const { email, password } = req.body

    //verificar credenciales
    if (email !== fakeUser.email || password !== fakeUser.password) {
      res.status(401).json({ message: "Credenciales incorrectas" })
    }

    //Crear payload (Es lo que ira dentro del token)
    const payload = {
      id: fakeUser.id,
      email: fakeUser.email
    }

    //generar token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

    res.send({ token })
  } catch (error) {
    console.log(err)
  }
}