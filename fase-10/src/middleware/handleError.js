export const handleError = (err, req, res) => {
  res.status(500).json({ message: "Error en el servidor" })
}

