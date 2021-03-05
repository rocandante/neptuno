'use strict'

const router = require('express').Router()
const pkg = require('../../package.json')


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

module.exports = router