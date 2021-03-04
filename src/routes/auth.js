'use strict'

const router = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pkg = require('../../package.json')
const moment = require('moment')


/**
 * Retorna informacón básica del servidor API
 * con código 200
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {

    let info = {
        "name": pkg.name,
        "version": pkg.version,
        "description": pkg.description
    }

    return res.status(200).json(info)
})

/**
 * Realiza la operación de validación de credenciales
 * de un usuario, Si son correctas generá un token
 * para su identificación durante la sesión abierta,
 * de lo contrario retorna el código 400 con su
 * respectivo error
 * @param {*} req 
 * @param {*} res 
 */
router.post('/login', async function (req, res) {

    try {
        let user = await User.findOne({ username: req.body.username})

        if (!user) throw 'Usuario o contraseña incorrectos'

        // Validar si usario activo
        if (!user.isActive) throw 'Usuario no activo'

        // Validar password
        const validPass = await bcrypt.compare(req.body.password, user.password)

        if(!validPass) throw 'Usuario o contraseña incorrectos'

        // Genera token
        const token = jwt.sign({ 
            sub: user._id, 
            exp: moment().add(8, 'hours').unix() // Expira en 8 horas
        }, process.env.TOKEN_SECRET)

        res.status(200).header('auth-token', token).send(token)

    } catch (err) {
        res.status(400).json({
            errors: err
        })   
    }

})


router.post('logout', async function (req, res) {
    // TODO: hacer la función de logout de la API como borrar token de sesión
})

module.exports = router