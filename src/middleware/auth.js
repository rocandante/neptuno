const { sign, verify } = require('jsonwebtoken')
const config = require('../server/config')

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

module.exports = {
  signToken,
  auth
}
