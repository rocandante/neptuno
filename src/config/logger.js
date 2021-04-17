const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const morgan = require('morgan')
const stripFinalNewline = require('strip-final-newline')
const { request } = require('express')

// Opciones para Winston
const options = {
  file: {
    frequency: '24h',
    level: 'info',
    dirname: './/logs//',
    filename: 'app-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '90d'
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    format: format.simple()
  },
}

// Nes daily file
const transport = new (transports.DailyRotateFile)(options.file)

// Setup logger
const logger = createLogger({
  colorize: true,
  format: format.simple(),
  transports: [ 
    transport,
    new transports.Console(options.console)
  ]
})

// Setup requests logger
morgan.token('id', req => req.id)

const requestFormat = ':remote-addr [:date[iso]] :id ":method :url HTTP/:http-version" :status | :remote-user ":user-agent" ":referrer"'

const requests = morgan(requestFormat, {
  stream: {
    write: (message) => {
      // Remove all line breaks
      const log = stripFinalNewline(message)
      return logger.info(log)
    }
  }
})

// Attach to logger object
logger.requests = requests

// Format as request logger and attach to logger object
logger.header = (req) => {
  const date = new Date().toISOString()
  return `${req.ip} [${date}] ${req.id} "${req.method} ${req.originalUrl}"`
}

module.exports = logger
