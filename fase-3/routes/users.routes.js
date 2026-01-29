import express from 'express'

const router = express.Router()

let users = [
  { id: 1, name: "Juan", active: true },
  { id: 2, name: "Ana", active: false }
]

router.get("/", (req, res) => {
  res.json(users)
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user) {
    return res.status(404).json({ mensaje: "usuario no encontrado" })
  }
  res.json(user)
})

router.post("/registrar", (req, res) => {
  const name = req.body.name

  if(name === "") return res.status(400).json({mensaje: "Nombre vacio"})

  const nuevo = {
    id: users.length + 1,
    name: name,
    active: false
  }

  users.push(nuevo)

  res.json({ ...users })
})


export default router