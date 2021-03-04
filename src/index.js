const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// Configuraciones
app.set('port', process.env.PORT)

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rutas
const userRoute = require('./routes/user')
const loginRoute = require('./routes/auth')

app.use('/api/user', userRoute)
app.use('/api', loginRoute)


// Base de datos
mongoose.connect(
    process.env.DB_HOST, 
    {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Error al conectar con MongoDB:'))
db.once('open', function() {
    console.log('Base de datos conectada')

    //Servidor
    app.listen(app.get('port'), function() {
        console.log('Servidor en puerto: ' + app.get('port'))
    })
})