## FASE 7

En esta fase se reforzó el trabajo con **relaciones entre tablas** creando un sistema con varias entidades: **students**, **courses** y **enrollments**, aplicando los conceptos de **PK** y **FK**.

Se trabajó con una relación **muchos a muchos (N:M)** usando una **tabla intermedia (`enrollments`)** para relacionar estudiantes con cursos.

Se siguió usando la estructura **MVC**, organizando el proyecto de esta forma:

- **routes**: definición de las rutas de cada recurso.  
- **controllers**: lógica de cada operación.  
- **config**: conexión a la base de datos **PostgreSQL**.  
- **middleware**: manejo general de errores.

Durante esta fase se pudo:

- Crear y consultar **estudiantes**.
- Crear y consultar **cursos**.
- Registrar qué estudiantes están inscritos en qué cursos.
- Usar consultas con **JOIN** para traer información relacionada entre tablas.
- Validar los datos que llegan desde el cliente antes de guardarlos.
- Verificar que los registros existan antes de crear relaciones entre tablas.
- Centralizar los errores con un **middleware global**.

El objetivo de esta fase fue entender mejor cómo trabajar con varias tablas relacionadas desde el backend, manteniendo el orden del proyecto y evitando datos inconsistentes.
