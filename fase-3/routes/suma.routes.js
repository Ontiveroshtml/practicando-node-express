import express from "express";
import { validarNumeros } from "../middleware/validarNumeros.js";

const router = express.Router()

router.post("/", validarNumeros, (req, res) => {
  const a = Number(req.body.a)
  const b = Number(req.body.b)

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({
      ok: false,
      mensaje: "Deben ser números"
    })
  }
  res.json({ ok: true, resultado: a + b })
})

export default router