const router = require('express').Router()
const db = require('../_helpers/db')
const verify = require('../_middleware/verifyToken')
const handleError = require('../_middleware/error-handler')
const userService = require('./user.service')

// Rutas
// router.all('*', verify)
router.get('/', getAll)
router.get('/:id', getById)
router.get('/email/:email', getByEmail)
router.post('/', create)
router.post('/login', authenticate)
router.put('/:id', update)

module.exports = router

async function getAll(req, res) {
    try {
        let docs = await db.User.find()

        if (!docs) throw 'No se encontraron documentos en la colección User'
       
        res.status(200).json(docs.map( x => userService.basicInfo(x) ))
    } catch (err) {
        handleError(err, req, res)
    }
}

async function getById(req, res) {
    try {

        if (!db.isValidId(req.params.id)) throw 'El ID ingresado no es válido'

        let docs = await db.User.findById(req.params.id)
        res.status(200).json(userService.basicInfo(docs))
    } catch (err) {
        handleError(err, req, res)
    }
}

async function getByEmail(req, res) {
    try {
        let docs = await db.User.findOne({ email: req.params.email })

        if (!docs) throw 'No se encontró el email: ' + req.params.email

        res.status(200).json(userService.basicInfo(docs))
    } catch (err) {
        handleError(err, req, res)
    }
}

async function create(req, res) {
    try {
        // validate
        if (await db.User.findOne({ email: req.body.email })) {
            throw 'Email: "' + req.body.email + '" ya está registrado'
        }

        // Encriptar el password
        const hashPass = await userService.hash(req.body.password)
        
        let user = new db.User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashPass,
            rol: req.body.rol
        })
    
        await user.save()
        res.status(201).json(userService.basicInfo(user))
    } catch (err) {
        handleError(err, req, res)
    }
}

/**
 * Realiza la operación de validación de credenciales
 * de un usuario, Si son correctas generá un token
 * para su identificación durante la sesión abierta,
 * de lo contrario retorna el código 400 con su
 * respectivo error
 * @param {*} req 
 * @param {*} res 
 */
async function authenticate (req, res) {
    try {
        let user = await db.User.findOne({ username: req.body.username})

        if (!user) throw 'Usuario o contraseña incorrectos'

        // Validar si usario activo
        if (!user.isActive) throw 'Usuario no activo'

        // Validar password
        const validPass = await userService.validPass(req.body.password, user.password)

        if(!validPass) throw 'Usuario o contraseña incorrectos'

        // Genera token
        const token = await userService.generateToken( user )

        res.status(200).header('auth-token', token).send(token)

    } catch (err) {
        handleError(err, req, res) 
    }
}

async function update(req, res) {
    try {
        // valida el ID
        if (!db.isValidId(req.params.id)) throw 'El ID ingresado no es válido'

        let docs = await db.User.findById(req.params.id)

        if (!docs) throw 'No se encontró un documento con el ID ' + req.params.id

        // valida si el email cambió
        if (req.body.email && docs.email !== req.body.email && await db.User.findOne({ email: req.body.email})) {
            throw 'Email "' + req.body.email + '" ya existe';
        }

        // copia los parametros de la petición al documento y los guarda
        Object.assign(docs, req.body)
        await docs.save()

        res.status(201).json(userService.basicInfo(docs))
    } catch (err) {
        handleError(err, req, res)
    }
}
