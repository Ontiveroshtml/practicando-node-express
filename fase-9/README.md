## FASE 9

En esta fase se implementó un sistema básico de **autenticación con JWT (JSON Web Token)** para entender cómo funciona el proceso de **login**, la **generación de tokens** y la **protección de rutas** en una API con Node.js y Express.

Se trabajó con un ejemplo sencillo usando un **usuario simulado (fake user)**, con el objetivo de enfocarse en el flujo de autenticación sin depender todavía de una base de datos.

Se mantuvo la organización del proyecto por capas:

- **routes**: rutas públicas y rutas protegidas.
- **controllers**: lógica del login y creación del token.
- **middlewares**: validación del token y protección de rutas.
- **config / env**: uso de variables de entorno para la clave secreta del JWT.

Durante esta fase se pudo:

- Implementar un endpoint de **login** que:
  - Recibe **email** y **password**.
  - Valida las credenciales del usuario.
  - Genera un **token JWT** con información básica del usuario.
- Entender el concepto de **payload**, que son los datos que viajan dentro del token.
- Crear un **middleware de autenticación** que:
  - Lee el token desde el header **Authorization**.
  - Verifica su validez usando `jwt.verify`.
  - Guarda la información decodificada en `req.user`.
- Proteger rutas usando el middleware de autenticación.
- Acceder a los datos del usuario autenticado desde `req.user` dentro de los controllers.
- Probar el flujo completo:
  - Login → generación del token.
  - Envío del token en los headers.
  - Acceso a rutas protegidas.

El objetivo de esta fase fue comprender cómo funciona internamente la autenticación con JWT, separando la lógica entre controladores y middlewares, y dejando lista la base para integrar autenticación real con base de datos en una fase posterior.
