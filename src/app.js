const express = require('express')
const requestId = require('express-request-id')()
const errorHandler = require('./middleware/errorHandler')
const logger = require('./config/logger')
const api = require('./api/v1')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../openapi.json')


const app = express()

// set security HTTP headers
app.use(helmet())

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Setup cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
  })
)

// Setup middleware
app.use(requestId)
app.use(logger.requests)

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// sanitize request data
app.use(xss())
// app.use(mongoSanitize())

// Setup router and routes
app.use('/api/v1', api)

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
