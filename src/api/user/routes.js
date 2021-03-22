const router = require('express').Router()
const controller = require('./controller')
const { auth, role, me } = require('../../middleware/auth')

/*
* /api/users/ POST      - Create
* /api/users/ GET       - Read all
* /api/users/:id GET    - Read one
* /api/users/:id PUT    - Update
* /api/users/:id DELETE - Delete
*/

router
  .route('/')
  .post(auth, role(['admin']), controller.create)
  .get(auth, role(['admin']), controller.getAll)

router
  .route('/login')
  .post(controller.login)

router
  .route('/signup')
  .post(controller.signup)  

router.param('id', controller.id)

router
  .route('/:id')
  .get(auth, role(['admin']), controller.getOne)
  .put(auth, role(['admin']), controller.update)
  .delete(auth,role(['admin']), controller.deleteOne)

router
  .route('/profile/:id')
  .get(auth, role(['user', 'admin']), me, controller.getProfile)
  .put(auth, role(['user', 'admin']), me, controller.updateProfile)
 

module.exports = router
