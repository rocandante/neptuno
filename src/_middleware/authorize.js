'use strict'

const jwt = require('jsonwebtoken')
const db = require('../_helpers/db')
const dotenv = require('dotenv').config()
const handleError = require('./error-handler')

module.exports = authorize

/**
 * Evalua si un usuario tiene acceso según su rol de usuario,
 * también verifica que exista un token y que sea válido.
 * @author Juan Cardona
 * @param {*} [roles=[]]
 * @return {*} 
 */
function authorize (roles = []) {
    
    if (typeof roles === 'string') {
        roles = [roles]
    }

    return [

        // autoriza basado en el rol del usuario
        (req, res, next) => {
            // Obtiene el token desde el encabezado dentro de la petición
            const token = req.header('auth-token')

            // Si no existe la cabezera en la petición termina
            if (!token) return res.status(401).send('Acceso denegado - Token no válido')
           
            // * Verifica el token sea válido, incluido si su fecha expiro
            jwt.verify(token, process.env.APP_KEY, function( err, validToken ) {
                try {
                    // valida si usuario existe
                    const user = db.User.findById(validToken.sub)

                    if (!user) return res.status(401).json({ message: 'Acceso denegado - No existe el usuario' })

                    if (roles.length && !roles.includes(user.role)) {
                        return res.status(401).json({ message: 'Acceso denegado - no tiene permiso para esta acción' })
                    }

                    // asigna el token al objeto request
                    req.user = validToken.sub
                    
                } catch (err) {
                    handleError(err, req, res)
                }
                
            })                          

            next()
        }
        
    ]

}