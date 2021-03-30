const { sign, verify } = require('jsonwebtoken')
const config = require('../server/config')
const Model = require('../api/user/model')

const { secret, expires } = config.token

/**
 * Genera un Token usando jsonwebtoken
 * @param {*} payload - datos que serán incluidos en el token
 * @param {*} expiresIn - vigencia del token
 * @returns 
 */
const signToken = (payload, expiresIn = expires) =>
  sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn
  })

/**
 * Verifica que la petición a un endpoint contenga un token válido
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const auth = (req, res, next) => {
  let token = req.headers.authorization || req.query.token || ''

  if (token.startsWith('Bearer ')) {
    token = token.substring(7)
  }

  if (!token) {
    const message = 'Unauthorized - Token invalid'

    return next({
      success: false,
      message,
      statusCode: 401,
      level: 'info'
    })
  }

  verify(token, config.token.secret, (err, decoded) => {
    if (err) {
      const message = 'Unauthorized'

      return next({
        success: false,
        message,
        statusCode: 401,
        level: 'info'
      })
    }

    req.decoded = decoded
    next()
  })
}

/**
 * Restringe el acceso a los endpoints según el rol
 * asignado al usuario
 * @param {*} roles - rol o conjunto de roles que posee el usuario
 * @returns 
 */
const role = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles]
  }
  
  return [
    async (req, res, next) => {
      const { decoded = {} } = req
      const { sub } = decoded

      if (!decoded) {
        const message = 'Access denied'
    
        return next({
          success: false,
          message,  
          statusCode: 401,
          level: 'info'
        })
      }
      
      // valida si usuario existe
      const user = await Model.findById(sub).exec()
    
      if (!user) {
        const message = 'Access denied - user not found'
    
        return next({
          success: false,
          message,
          statusCode: 401,
          level: 'info'
        })
      } 
      
      if (roles.length && !roles.includes(user.role)) {
        const message = 'Access denied - you do not have permission for this action'
    
        return next({
          success: false,
          message,
          statusCode: 401,
          level: 'info'
        })
      }
    
      next()
    }
  ]
  
}

/**
 * Restringe que las acciones PUT o DELETE sólo se realicen
 * sobre los documentos pertenecientes al mismo usuario.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const me = (req, res, next) => {
  const { decoded = {}, params = {} } = req
  const { sub } = decoded
  const { id } = params

  if (sub !== id) {
    const message = 'Forbidden'

    return next({
      success: false,
      message,
      statusCode: 403,
      level: 'warn'
    })
  }

  next()
}

const owner = (req, res, next) => {
  const { decoded = {}, doc = {} } = req
  const { sub } = decoded

  console.log(doc)

  const { id } = doc.userId

  if (sub !== id) {
    const message = 'Forbidden'

    return next({
      success: false,
      message,
      statusCode: 403,
      level: 'warn'
    })
  }

  next()
}

module.exports = {
  signToken,
  auth,
  role,
  me,
  owner
}
