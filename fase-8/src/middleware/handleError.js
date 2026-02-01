const handleError = (err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: "Error en el servidor, contacte con soporte" })
}

export default handleError