const logger = require('../server/logger')

/**
 * Middleware responsable de manejar los errores,
 * escribir un archivo log y dar una respuesta controlada
 * del evento
 * @param {*} err
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function errorHandler (err, req, res, next) {
  const { statusCode = 500, message, level = 'error' } = err
  const log = `${logger.header(req)} ${statusCode} ${message}`

  // Escribe el log
  logger[level](log)
  
  res.status(statusCode)
  res.json({
    success: false,
    statusCode,
    message
  })
}

module.exports = errorHandler
