import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  //Leer token
  const header = req.headers.authorization

  if (!header) {
    res.status(401).json({ message: "Token requerido" })
  }

  //obtenemos el token
  const token = header.split(" ")[1]

  try {
    //verifiacar el token
    const decoded = jwt.verify(token, process.env.SECRET)

    //guardar la info en req
    req.user = decoded

    next()
  } catch (err) {
    res.status(401).json({ message: "Token invalido" })
  }
}