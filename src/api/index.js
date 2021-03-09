const router = require('express').Router()

const { route } = require('./task/routes')
const tasks = require('./task/routes')

router.use('/tasks, tasks')

module.exports = router
