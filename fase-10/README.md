## FASE 10

En esta fase se implementó un sistema completo de **autenticación con JWT** usando **Node.js, Express y PostgreSQL**, trabajando ya con un flujo real de **registro de usuarios**, **login** y **protección de rutas**.

A diferencia de la fase anterior, aquí se usó una **base de datos real**, relacionando usuarios con tareas y utilizando el token para identificar al usuario autenticado.

Se mantuvo la organización por capas:

- **routes**: rutas públicas (`/auth`) y rutas protegidas (`/api`).
- **controllers**: lógica de registro, login y manejo de tareas.
- **middlewares**: validación del token y control de acceso.
- **config / env**: configuración de la base de datos y variables de entorno.

Durante esta fase se logró:

- Implementar **registro** y **login** con base de datos.
- Generar y validar **tokens JWT** con información del usuario.
- Proteger rutas usando un middleware de autenticación.
- Crear un sistema de **tareas asociadas a usuarios**.
- Obtener el ID del usuario desde el token (`req.user`) y no desde el body.

**ACTUALIZACIÓN**
Se agregó:
- Una nueva ruta (`/admin`) para poner en practica los permisos por roles utilizando los **tokens JWT**
- Ahora se puede visualizar las tareas dependiendo el usuario
- Implementacion de **bcrypt** al registrar un usuario 


El objetivo de esta fase fue entender cómo funciona la autenticación con JWT en un entorno real con base de datos
