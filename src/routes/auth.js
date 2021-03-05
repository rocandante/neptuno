'use strict'

const router = require('express').Router()
const User = require('../users/user.model')
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

router.post('logout', async function (req, res) {
    // TODO: hacer la función de logout de la API como borrar token de sesión
})

module.exports = router