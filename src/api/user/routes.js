const router = require('express').Router()
const controller = require('./controller')
const { auth } = require('../../middleware/auth')

/*
* /api/users/ POST      - Create
* /api/users/ GET       - Read all
* /api/users/:id GET    - Read one
* /api/users/:id PUT    - Update
* /api/users/:id DELETE - Delete
*/

router
  .route('/')
  .post(auth, controller.create)
  .get(auth, controller.getAll)

router
  .route('/login')
  .post(controller.login)

router
  .route('/signup')
  .post(controller.create)

router.param('id', controller.id)

router
  .route('/:id')
  .get(auth, controller.getOne)
  .put(auth, controller.update)
  .delete(auth, controller.deleteOne)
 

module.exports = router
