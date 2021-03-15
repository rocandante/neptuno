const express = require('express')
const requestId = require('express-request-id')()
const errorHandler = require('../middleware/errorHandler')
const logger = require('./logger')
const api = require('../api')

const app = express()

// Setup middleware
app.use(requestId)
app.use(logger.requests)

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())


// Setup router and routes
app.use('/api', api)

app.get('/', (req, res, next) => {
  res.send('Bienvenido a la API REST')
})

// No route found handler
app.use( (req, res, next) => {
  next( {
    message: 'Route not found',
    statusCode: 404,
    level: 'warn'
  })
})

// Error handler
app.use(errorHandler)

module.exports = app
