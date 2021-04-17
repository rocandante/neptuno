# neptuno

Neptuno es un boilerplate para crear un API RESTful usando Nodejs + Express + Mongoose.

Este proyecto lo inicie como proceso de autoaprendizaje y ya ha llegado a un punto donde puede ser usado por cualquier que lo desee para desarrollar sus propias aplicaciones backend.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Comandos](#comandos)
- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación de la API](#documentación-de-la-api)

## Instalación

Para crear un nuevo proyecto, simplemente ejecuta:

```bash
git clone https://github.com/rocandante/neptuno.git <project-name>
```

Ingresa a la carpeta de tu proyecto para instalar las dependencias y ejecuta:

```bash
npm install
```

Ahora has una copia del archivo .env

```bash
cp .env.example .env
```

Abre el archivo .env y modifica las variables de entorno (de ser el caso)

## Comandos

Para correr localmente:

```bash
npm run dev
```

Para correr en producción:

```bash
npm run start
```

## Características

- Base de datos NoSQL con Mongoose.
- Autenticación y autorización local out-the-box.
- Winston y Morgan para generar los log de las peticiones a la API.
- Manejo de errores centralizado.
- Variables de entorno con Dotenv.
- Cors activado por defecto.
- Documentación de la API con Swagger y OpenAPI.
- Eslint configurado con Javascript Standard.
- Archivo Editor Config para usar una configuración consistente en tu editor preferido.
- Seguridad con Helmet y protección con express-mongo-santize y xss-clean.

## Estructura del Proyecto

```
src\
 |--api\v1\         # Ruta a los modulos de tu API
 |--api\v1\user     # Modúlo con el modelo, controlador y rutas para el manejo de Usuarios.
 |--api\v1\task     # Modúlo de ejemplo con funciones básicas para la gestión de tareas.
 |--config\         # Configuraciones de base de datos, variables de entorno, entre otros.
 |--helper\         # Clases y funciones de ayuda o de utilidad.
 |--middlewares\    # Carpeta para los middleware de la API
 |--app.js          # Aplicación Express
 |--index.js        # App que lanza el servidor y la API.
 |--openapi.json    # Esquema de datos para la documentación de la API con Swagger.

```

## Documentación de la API

Para ver la lista de la especificación de la API, ejecuta el servidor e ingresa a `http://localhost:3000/api/v1/docs/` en tu navegador. Esta documentación se genera automáticamente usando la definición Openapi de [swagger](https://swagger.io/)

## Contribuciones

Las contribuciones son bienvenidas.

## License

[MIT](LICENSE)
