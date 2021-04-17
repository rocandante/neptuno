# neptuno

Neptuno es un boilerplate para crear un API RESTful usando Nodejs + Express + Mongoose.

Este proyecto lo inicie como proceso de autoaprendizaje y ya ha llegado a un punto donde puede ser usado por cualquier que lo desee para desarrollar sus propias aplicaciones backend.

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
