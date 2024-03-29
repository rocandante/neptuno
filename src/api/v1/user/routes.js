const router = require('express').Router()
const controller = require('./controller')
const { auth, role, me } = require('../../../middleware/auth')
const taskRouter = require('../task/routes')
const { sanitizers, sanitizerLogin } = require('./model')

/*
* /api/users/ POST      - Create
* /api/users/ GET       - Read all
* /api/users/:id GET    - Read one
* /api/users/:id PUT    - Update
* /api/users/:id DELETE - Delete
*/

router
  .route('/')
  .post(auth, role(['admin']), sanitizers, controller.create)
  .get(auth, role(['admin']), controller.getAll)

router
  .route('/login')
  .post(sanitizerLogin, controller.login)

router
  .route('/signup')
  .post(sanitizers, controller.signup)  

router.param('id', controller.id)

router
  .route('/:id')
  .get(auth, role(['admin']), controller.getOne)
  .put(auth, role(['admin']), sanitizers, controller.update)
  .delete(auth,role(['admin']), controller.deleteOne)

router
  .route('/profile/:id')
  .get(auth, role(['user', 'admin']), me, controller.getProfile)
  .put(auth, role(['user', 'admin']), me, sanitizers, controller.updateProfile)


router.use('/:userId/tasks', taskRouter)
 

module.exports = router
