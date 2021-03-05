'use strict'

const dotenv = require('dotenv')
const mongoose = require('mongoose')
const handleError = require('../_middleware/error-handler')

dotenv.config()

// parametros para la conexión con MongoDB
const connectionOptions = { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
}

try {
    mongoose.connect( process.env.DB_HOST, connectionOptions )

    console.log('Base de datos conectada')

} catch (error) {
    handleError(error)
}

module.exports = {
    User: require('../users/user.model'),
    // RefreshToken: require('accounts/refresh-token.model'),
    isValidId
}

// Verifica si el id es un objeto valido en MongoDB
function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}