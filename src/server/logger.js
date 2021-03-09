const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

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

module.exports = logger
