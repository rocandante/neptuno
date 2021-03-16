const { sign, verify } = require('jsonwebtoken')
const config = require('../server/config')
const Model = require('../api/user/model')

const { secret, expires } = config.token

const signToken = (payload, expiresIn = expires) =>
  sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn
  })

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

const role = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles]
  }
  
  return [
    async (req, res, next) => {
      if (!req.decoded) {
        const message = 'Access denied'
    
        return next({
          success: false,
          message,  
          statusCode: 401,
          level: 'info'
        })
      }
      
      // valida si usuario existe
      const user = await Model.findById(req.decoded.sub).exec()
    
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

module.exports = {
  signToken,
  auth,
  role
}
