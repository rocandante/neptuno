const express = require('express')
const { level } = require('./logger')
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
  next( {
    message: 'Route not found',
    statusCode: 404,
    level: 'warn'
  })
})

// Error handler
app.use( (err, req, res, next) => {
  const { statusCode = 500, message, level = 'error' } = err
  const log = `${logger.header(req)} ${statusCode} ${message}`

  logger[level](log)
  
  res.status(statusCode)
  res.json({
    message
  })
})

module.exports = app
