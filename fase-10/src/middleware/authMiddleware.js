import jwt from "jsonwebtoken"
import 'dotenv/config'

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    res.status(401).json({ message: "Token requerido" })
  }

  // "bearer asdkakvjfqpofk.."
  const token = header.split(" ")[1]
  // ["bearer", "laskdlaskd.."]
  try {
    const decoded = jwt.verify(token, process.env.SECRET)

    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: "Token invalido" })
  }
}