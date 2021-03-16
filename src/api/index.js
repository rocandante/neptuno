const router = require('express').Router()

const tasks = require('./task/routes')
const users = require('./user/routes')

router.use('/users', users)
router.use('/tasks', tasks)

module.exports = router
