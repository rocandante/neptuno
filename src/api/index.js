const router = require('express').Router()

const tasks = require('./task/routes')

router.use('/tasks', tasks)

module.exports = router
