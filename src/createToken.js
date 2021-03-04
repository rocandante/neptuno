const crypto = require('crypto')
const fs = require('fs')

/**
 * Función que genera un token de 64 bytes aleatorio
 * y lo guarda en el archivo de entorno .env 
 * bajo la variable TOKEN_SECRET para ser usado
 * como llave de encriptación.
 * @author Juan Cardona
 * @param {*} err 
 * @param {*} buf 
 */
crypto.randomBytes(64, function (err, buf) {

    if (err) throw err

    // Abre el archivo .env y guarda el token al final del archivo
    fs.appendFile('.env', `TOKEN_SECRET = '${buf.toString('hex')}'`, function (err) { 
        if (err)
            console.log(err)
        else
            console.log(`Token de ${buf.length} bytes generado exitosamente`)
    })
})

