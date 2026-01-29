export function validarNumeros(req, res, next) {
  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).json({
      ok: false,
      mensaje: "No se encontraron datos"
    })
  }

  next()
}

