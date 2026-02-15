import { createOrderService } from "../services/order.service.js"

export const createOrder = async (req, res) => {
  try {
    const userId = req.body.user_id

    const order = await createOrderService(userId)
    res.status(201).json({ data: order })

  } catch (err) {
    res.status(500).json({ ERROR: err })
    console.log(err)
  }
}

