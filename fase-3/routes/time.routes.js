import express from 'express'

const router = express.Router()

router.get("/", (req, res) => {
  const now = new Date()
  res.json({
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds()
  })
})

export default router