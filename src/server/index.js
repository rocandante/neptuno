const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res, next) => {
  res.send('Bienvenido a la API REST')
})

// No route found handler
app.use( (req, res, next) => {
  res.status(404)
  res.json({
    message: 'Error. Route not found'
  })
})

// Error handler
app.use( (req, res, next) => {
  const { statusCode = 500, message } = err

  res.status(statusCode)
  res.json({
    message
  })
})

module.exports = app
