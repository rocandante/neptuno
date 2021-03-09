const express = require('express')
const requestId = require('express-request-id')()
const logger = require('./logger')

const app = express()

// Setup middleware
app.use(requestId)
app.use(logger.requests)

app.get('/', (req, res, next) => {
  res.send('Bienvenido a la API REST')
})

// No route found handler
app.use( (req, res, next) => {
  const message = 'Route not found'
  const statusCode = 404

  logger.warn(message)

  res.status(statusCode)
  res.json({
    message
  })
})

// Error handler
app.use( (req, res, next) => {
  const { statusCode = 500, message } = err

  logger.error(message)
  
  res.status(statusCode)
  res.json({
    message
  })
})

module.exports = app
