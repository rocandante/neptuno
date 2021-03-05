const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rutas
app.use('/api', require('./_helpers/serverInfo'))
app.use('/api/user', require('./users/user.controller'))


//Servidor
app.set('port', process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000)

app.listen(app.get('port'), function() {
    console.log('Servidor en puerto: ' + app.get('port'))
})