# Dashboard-Backend
### *Descargar siempre rama* main *para pruebas!* 

* ## Configuración Inicial:
  1. Descargar PostgreSQL 13.4 https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
  2. Crear una base de datos en el servidor default **(PostgreSQL 13)** con el nombre **proyecto_stress**

        ![image](https://user-images.githubusercontent.com/80529583/139567399-4197151d-3e3b-463c-b310-7c273c0670cd.png)

  3. En el archivo sequelize.js -que se encuentra en la ruta **app/db/sequelize.js**- en la **linea 16** realizar los siguientes cambios para la acción deseada:
  
  
        ![image](https://user-images.githubusercontent.com/80529583/139566584-367fe3c6-4ed3-4d9c-8d1d-3cbc4c2cdc59.png)

    * {force: true}: Cada vez que se ejecute el código, las tablas y todos los datos seran borrados y vueltas a crear. Fuerza la creación desde cero de las tablas.
    * {alter: true}: Cada vez que se ejecute el código, sequelize comparará entre los modelos y las tablas y aplicará los cambios. No borra ni datos ni tablas.

Eso por ahora, implementaré *migraciones* entre hoy y mañana. Generan un control de "versiones" de ejecuciones de la BD.
Y el lunes implemento Tokens.
