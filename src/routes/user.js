const router = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const verify = require('../middlewares/verifyToken')

router.all('*', verify)


router.get('/', async function (req, res) {

    try {
        let docs = await User.find().exec()
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json({
            message: 'Error al devolver la lista de usuarios o no existe ningún usuario',
            error: err
        })
    }
})

router.get('/:id', async function(req, res) {

    try {
        let docs = await User.findById(req.params.id).exec()
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json({
            message: 'Error buscando usuario por ID',
            errors: err
        })
    }
})

router.get('/email/:email', async function(req, res) {

    try {
        let docs = await User.findOne({ email: req.params.email }).exec()
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json({
            message: 'Error buscando usuario por email',
            errors: err
        })
    }
})

router.post('/', async function(req, res) {

    // Encriptar el password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    
    let user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        rol: req.body.rol
    })

    try {
        const result = await user.save()
        res.status(201).json({
            message: "Nuevo usuario agregado"
        })
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.put('/:id', async function (req, res) {

    try {
        await User.findByIdAndUpdate(req.params.id, req.body).exec()
        res.status(201).json({
            message: "Usuario actualizado"
        })
    } catch (err) {
        res.status(400).json(err.message)
    }
})

module.exports = router