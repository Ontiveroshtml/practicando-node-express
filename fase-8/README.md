## FASE 8

En esta fase se reforzó el manejo de **relaciones entre varias tablas** implementando un sistema con las entidades: **clients**, **products** y **orders**, aplicando correctamente los conceptos de **PK** y **FK**.

Se trabajó con una relación **uno a muchos (1:N)** entre:

- **clients → orders**  
- **products → orders**

donde la tabla **orders** funciona como tabla dependiente y contiene las llaves foráneas `client_id` y `product_id`.

Se mantuvo la estructura **MVC**, organizando el proyecto de la siguiente forma:

- **routes**: definición de las rutas de cada recurso.  
- **controllers**: lógica de cada operación.  
- **config**: conexión a la base de datos **PostgreSQL**.  
- **middleware**: validaciones y manejo general de errores.

Durante esta fase se pudo:

- Crear, listar, actualizar y eliminar **clientes**.
- Crear, listar, actualizar y eliminar **productos**.
- Crear, listar, actualizar y eliminar **órdenes**.
- Validar los datos antes de guardarlos en la base de datos.
- Verificar que existan los **clientes** y **productos** antes de crear o actualizar una orden.
- Usar **middlewares de validación** para separar la lógica de los controladores.
- Hacer consultas con **JOIN** para obtener información relacionada entre clientes, productos y órdenes.
- Centralizar los errores con un **middleware global (`handleError`)**.

El objetivo de esta fase fue entender mejor cómo trabajar con tablas relacionadas usando claves foráneas, practicando un **CRUD completo** (GET, POST, PUT, DELETE) y manteniendo el proyecto ordenado y fácil de escalar.
