
const handleError = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ mensaje: 'Error en el servidor' });
}


export default handleError
