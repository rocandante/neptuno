const { createLogger, format, transports } = require('winston')

// Setup logger
const logger = createLogger({
  format: format.simple(),
  transports: [ 
    new transports.Console(),
    new transports.File({ filename: 'error.log' })
  ]
})

module.exports = logger
