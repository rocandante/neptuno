'use strict'

const jwt = require('jsonwebtoken')

/**
 * Función middleware que valida si se generó un token 
 * para identificar al usuario, de lo contrario
 * responde con el estado 403
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (req, res, next) {
    // Obtiene el token desde el encabezado dentro de la petición
    const token = req.header('auth-token')

    // Si no existe la cabezera en la petición termina
    if (!token) return res.status(401).send('Acceso denegado')

    try {
        // * Verifica el token sea válido, incluido si su fecha expiro
        const validToken = jwt.verify(token, process.env.TOKEN_SECRET)

        // asigna el token al objeto request
        req.user = validToken.sub

        next()

    } catch (err) {
        res.status(403).json({
            message: 'Token no válido',
            error: err
        })
    }

}