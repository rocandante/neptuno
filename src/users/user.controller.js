const router = require('express').Router()
const db = require('../_helpers/db')
const bcrypt = require('bcryptjs')
const verify = require('../_middleware/verifyToken')
const handleError = require('../_middleware/error-handler')

// Rutas
router.get('/', getAll)
router.get('/:id', getById)
router.get('/email/:email', getByEmail)
router.post('/', create)

module.exports = router

async function getAll(req, res) {
    try {
        let docs = await db.User.find()
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json({
            message: 'Error al devolver la lista de usuarios o no existe ningún usuario',
            error: err
        })
    }
}

async function getById(req, res) {
    try {

        if (!db.isValidId(req.params.id)) throw 'El ID ingresado no es válido'

        let docs = await db.User.findById(req.params.id)
        res.status(200).json(docs)
    } catch (err) {
        handleError(err, req, res)
    }
}

async function getByEmail(req, res) {
    try {
        let docs = await db.User.findOne({ email: req.params.email })

        if (!docs) throw 'No se encontró el email: ' +req.params.email
        
        res.status(200).json(docs)
    } catch (err) {
        // res.status(400).json({
        //     message: 'Error buscando usuario por email',
        //     errors: err
        // })
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
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        
        let user = new db.User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashPass,
            rol: req.body.rol
        })
    
        await user.save()
        res.status(201).json({
            message: "Nuevo usuario agregado"
        })
    } catch (err) {
        handleError(err, req, res)
    }
}

// router.all('*', verify)

// router.post('/', async function(req, res) {

//     // Encriptar el password
//     const salt = await bcrypt.genSalt(10)
//     const hashPass = await bcrypt.hash(req.body.password, salt)
    
//     let user = new User({
//         username: req.body.username,
//         name: req.body.name,
//         email: req.body.email,
//         password: hashPass,
//         rol: req.body.rol
//     })

//     try {
//         const result = await user.save()
//         res.status(201).json({
//             message: "Nuevo usuario agregado"
//         })
//     } catch (err) {
//         res.status(400).json(err.message)
//     }
// })

// router.put('/:id', async function (req, res) {

//     try {
//         await User.findByIdAndUpdate(req.params.id, req.body).exec()
//         res.status(201).json({
//             message: "Usuario actualizado"
//         })
//     } catch (err) {
//         res.status(400).json(err.message)
//     }
// })

// module.exports = router