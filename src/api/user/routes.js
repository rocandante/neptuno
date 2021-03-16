const router = require('express').Router()
const controller = require('./controller')

/*
* /api/users/ POST      - Create
* /api/users/ GET       - Read all
* /api/users/:id GET    - Read one
* /api/users/:id PUT    - Update
* /api/users/:id DELETE - Delete
*/

router
  .route('/')
  .post(controller.create)
  .get(controller.getAll)

router
  .route('/login')
  .post(controller.login)

router
  .route('/signup')
  .post(controller.create)

router.param('id', controller.id)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.deleteOne)
 

module.exports = router
