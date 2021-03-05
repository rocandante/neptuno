'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require('dotenv').config()

module.exports = {
    basicInfo,
    hash,
    validPass,
    generateToken
}

function basicInfo(user) {
    const { id, username, name, email, rol, isActive, createdOn } = user
    return { id, username, name, email, rol, isActive, createdOn }
}


function hash(password) {
    return bcrypt.hashSync(password, 10);
}

function validPass( req_pass, user_pass ) {
    return bcrypt.compareSync(req_pass, user_pass)
}

function generateToken ( user ) {
    const token = jwt.sign({ 
        sub: user._id,
        role: user.rol,
        exp: moment().add(8, 'hours').unix() // Expira en 8 horas
    }, process.env.APP_KEY)

    return token
}

/*
function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '15m' });
}
*/