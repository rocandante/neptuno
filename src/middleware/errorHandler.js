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
  const { message, level = 'error' } = err
  let { statusCode = 500 } = err
  const log = `${logger.header(req)} ${statusCode} ${message}`

  // Errores de validacion
  if ( err.message.startsWith('ValidationError')) {
    statusCode = 422
  }
  
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
