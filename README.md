Foodie - Food Prediction by Juan Pablo Hurtado
==============================================

![Foodie](https://www.tastingtable.com/img/gallery/what-makes-restaurant-burgers-taste-different-from-homemade-burgers-upgrade/l-intro-1662064407.jpg)

Descripción
-----------

Esta aplicación de backend desarrollada en Nest.js ofrece una funcionalidad completa para recomendar restaurantes y platos basados en el presupuesto, el gusto y la cocina del usuario. Utiliza una base de datos MongoDB para almacenar la información de los restaurantes y platos, lo que garantiza un almacenamiento eficiente y escalable.

Además, la aplicación cuenta con un sólido conjunto de pruebas unitarias implementadas utilizando el framework de pruebas Jest. Esto asegura la calidad del código y permite realizar pruebas exhaustivas para detectar posibles errores o fallos en la lógica de recomendación.

Funcionalidades Principales
---------------------------

*   Recomendación de restaurantes y platos según el presupuesto, el gusto y la cocina preferida.
*   Almacenamiento eficiente de la información utilizando una base de datos MongoDB.
*   Pruebas unitarias exhaustivas utilizando el framework de pruebas Jest.

Instalación
-----------

    $ npm install

### Ejecutar la Aplicación

    # Modo de desarrollo
    $ npm run start:dev
    
    # Modo de producción
    $ npm run start:prod

### Pruebas

    # Ejecutar pruebas unitarias
    $ npm run test
    
    # Generar informe de cobertura de pruebas
    $ npm run test:cov

Rutas
-----

La aplicación ofrece las siguientes rutas para consultar y recomendar restaurantes y platos:

*   GET /restaurants - Obtener todos los restaurantes.
*   GET /restaurants/:id - Obtener un restaurante por su ID.
*   POST /restaurants - Crear un nuevo restaurante.
*   PUT /restaurants/:id - Actualizar un restaurante existente.
*   DELETE /restaurants/:id - Eliminar un restaurante existente.
*   POST /restaurants/recommendationsByCuisine - Obtener restaurantes recomendados según las preferencias de cocina y gusto.
*   POST /restaurants/getRestaurantsByCuisine - Obtener restaurantes por tipo de cocina.
*   POST /restaurants/recommendationsByPrice - Obtener restaurantes recomendados según el presupuesto.

Base de Datos
-------------

La aplicación utiliza una base de datos MongoDB para almacenar la información de los restaurantes y platos. Asegúrate de tener MongoDB instalado y configurado antes de ejecutar la aplicación.

Soporte
-------

Nest.js es un proyecto de código abierto con licencia MIT. Puede crecer gracias a los patrocinadores y el apoyo de los increíbles colaboradores. Si deseas unirte, por favor [lee más aquí](https://docs.nestjs.com/support).
