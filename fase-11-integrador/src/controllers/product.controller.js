import { createProductService } from "../services/product.service.js"

export const createProduct = async (req, res) => {
  try {
    let name = req.body.name
    const price = Number(req.body.price)

    //Normalizar el nombre del producto
    name = name.trim().toUpperCase()

    //Validar que se haya ingresado el nombre del producto
    if (!name) {
      return res.status(400).json({ message: "Ingrese el nombre del producto" })
    }

    //Validar que se haya ingresado un numero y permitir que se permita guardar el precio en 0
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: "Formato de precio invalido" })
    }

  
    const product = await createProductService(name, price)

    res.status(201).json({ message: "Producto creado con exito", data: product })

  } catch (err) {
    res.status(500).json({ message: "Error al crear un producto", data: err })
    console.log(err)
  }
}