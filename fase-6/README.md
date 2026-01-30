## FASE 6

En esta fase se introdujo el manejo de **relaciones entre tablas** en una base de datos relacional, comprendiendo el uso de **Primary Key (PK)** y **Foreign Key (FK)** para vincular la información entre distintas entidades del sistema.

Se trabajó con el modelo de relación **uno a muchos (1:N)**, reforzando la importancia de la **integridad referencial** dentro de la base de datos.

Se aplicó la arquitectura **MVC (Model–View–Controller)** y se desarrolló la siguiente estructura:

- Definición de **nuevas tablas relacionadas** mediante claves foráneas.
- Creación de **rutas** para manejar recursos dependientes de otras tablas.
- Implementación de la lógica en la carpeta **controllers** para:
  - Verificar la existencia del registro referenciado antes de insertar datos.
  - Controlar errores cuando la relación entre tablas no es válida.
- Conexión y ejecución de **consultas a PostgreSQL** desde la carpeta **config**.
- Manejo de **errores** mediante **middlewares**.

El propósito de esta fase fue comprender cómo se relacionan las tablas entre sí y cómo validar dichas relaciones desde el backend, sentando las bases para trabajar con **estructuras de datos más complejas** en aplicaciones reales.
